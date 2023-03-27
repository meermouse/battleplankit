import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import './BattleViewerOptions.scss';

const options = [
    'battlelines_drawn.png', 'prize_of_gallet.png'
  ];

const path = "../../public/Season1/";

class BattleViewerOptions extends Component {
    constructor(props) {
        super(props);
        this.onDropDownChange = this.onDropDownChange.bind(this);
    }

    onDropDownChange = function(e) {
        var fullPath = path + e.value;
        this.props.onBattlePlanChange(fullPath);
    }
    render() {
        return <div className='battleViewerOptions-container'>
        <Dropdown options={options} onChange={this.onDropDownChange} placeholder="Select an option" />
        </div>
    }
}

export default BattleViewerOptions;