import React, { Component } from 'react'
import BattleCanvas from '../canvas/BattleCanvas.jsx'
import BattleViewerOptions from './BattleViewerOptions'
import './BattleViewer.scss';

class BattleViewer extends Component {
  render() {
    return <div>
      <BattleViewerOptions />
      <BattleCanvas styles='display: none'/>
    </div>
  }
}

export default BattleViewer;