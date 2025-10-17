#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {execSync} from 'node:child_process';

const yaml = (p => JSON.parse(
  JSON.stringify(
    // light yaml parser via Node 20: use std? If not, depend on 'yaml'
    // to keep it simple here, assume 'yaml' package installed:
    require('yaml').parse(fs.readFileSync(p,'utf8'))
  )
));

const micromatch = require('micromatch');

const RULES_FILE = path.resolve('.github/review-rules.yml');
if (!fs.existsSync(RULES_FILE)) {
  console.log('No custom rules file found, skipping.');
  process.exit(0);
}

const {rules = []} = yaml(RULES_FILE);

function getChangedFiles() {
  try {
    const base = process.env.GITHUB_BASE_REF ? `origin/${process.env.GITHUB_BASE_REF}` : 'HEAD~1';
    const out = execSync(`git diff --name-only ${base}...HEAD`, {encoding:'utf8'});
    return out.split('\n').filter(Boolean);
  } catch {
    // Fallback to all files in repo
    const all = [];
    (function walk(dir) {
      for (const entry of fs.readdirSync(dir)) {
        const p = path.join(dir, entry);
        const stat = fs.statSync(p);
        if (stat.isDirectory()) walk(p);
        else all.push(p);
      }
    })('.');
    return all;
  }
}

const files = getChangedFiles();

let violations = 0;

for (const rule of rules) {
  const {
    id, description, files: patterns = ['**/*'],
    exclude_paths = [], pattern, regex, kind, max_lines, severity = 'warning'
  } = rule;

  const targets = micromatch(files, patterns, {ignore: exclude_paths});
  for (const f of targets) {
    const src = fs.readFileSync(f, 'utf8');

    if (pattern && src.includes(pattern)) {
      annotate(f, `Rule ${id}: ${description} (found "${pattern}")`, severity);
      violations++;
    }

    if (regex) {
      const re = new RegExp(regex, 'm');
      if (re.test(src)) {
        annotate(f, `Rule ${id}: ${description}`, severity);
        violations++;
      }
    }

    if (kind === 'function-length' && typeof max_lines === 'number') {
      // very naive function-length check (JS/Py); adjust per language later
      const blocks = src.split(/^(function\s|\w+\s*\([^)]*\)\s*{|\bdef\s+\w+\s*\()/m);
      for (const block of blocks) {
        const lines = block.split('\n').length;
        if (lines > max_lines) {
          annotate(f, `Rule ${id}: ${description} — found ${lines} lines (> ${max_lines}).`, severity);
          violations++;
        }
      }
    }
  }
}

process.exit(0); // never fail the job; let maintainers decide if warnings block merges

function annotate(file, msg, severity) {
  const sev = severity === 'error' ? 'error' : 'warning';
  // GitHub Actions annotation (shows inline on PR)
  console.log(`::${sev} file=${file},title=Custom Rule Violation::${msg}`);
}
