import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import BattlePlanDropdown from '../shared/BattlePlanDropdown.jsx';
import './BattleViewerOptions.scss';

const options = [
    'BattlelinesDrawn.webp', 
    'InThePresenceOfIdols.webp',
    'OnlyTheWorthy.webp',
    'OursForTheTaking.webp',
    'PathOfAChampion.webp',
    'PositionOverPower.webp',
    'TheJawsOfGallet.webp',
    'TheLurkersBelow.webp',
    'TheNidusPaths.webp',
    'ThePrizeOfGallet.webp',
    'TheRealmstoneCache.webp',
    'TwistsAndTurns.webp'
  ];

const path = "./Season2/";

class BattleViewerOptions extends Component {
    constructor(props) {
        super(props);
        this.onDropDownChange = this.onDropDownChange.bind(this);
    }
    

    onDropDownChange = function(e) {
        var fullPath = path + e;
        this.props.onBattlePlanChange(fullPath);
    }
    render() {
        return <div className='battleViewerOptions-container'>
        <BattlePlanDropdown options={options} onOptionChanged={this.onDropDownChange} placeholder="Select an option" />
        </div>
    }
}

export default BattleViewerOptions;