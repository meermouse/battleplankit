import React, { Component } from 'react'
import BattleCanvas from '../canvas/BattleCanvas.jsx'
import BattleViewerOptions from './BattleViewerOptions'
import './BattleViewer.scss';

class BattleViewer extends Component {
  constructor(props) {
    super(props);
    this.onBattlePlanChange = this.onBattlePlanChange.bind(this);
    this.state = {
      path : ""
    }
  }

  onBattlePlanChange = function(e) {
    this.setState({ path: e });
  }

  render() {

    return <div>
      <BattleViewerOptions onBattlePlanChange={this.onBattlePlanChange} />
      <img className='battleViewer-map' src={this.state.path} />
      <BattleCanvas/>
    </div>
  }
}

export default BattleViewer;