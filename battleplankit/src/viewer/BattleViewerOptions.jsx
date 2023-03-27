import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import './BattleViewerOptions.scss';

const options = [
    'one', 'two', 'three'
  ];

const path = "../assets/22 23 Season 1/";

class BattleViewerOptions extends Component {
  onChange = function(e) {
    console.log(e);
  }
  render() {
    return <div className='battleViewerOptions-container'>
        <Dropdown options={options} onChange={this.onChange} placeholder="Select an option" />
    </div>
  }
}

export default BattleViewerOptions;