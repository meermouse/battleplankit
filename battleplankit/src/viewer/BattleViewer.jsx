import React, { Component } from 'react'
import BattleCanvas from '../canvas/BattleCanvas.jsx'
import BattleViewerOptions from './BattleViewerOptions'
import './BattleViewer.scss';

class BattleViewer extends Component {
  constructor(props) {
    super(props);
    this.onBattlePlanChange = this.onBattlePlanChange.bind(this);
    this.state = {
      path : '../../public/Season1/battlelines_drawn.png'
    }
  }

  onBattlePlanChange = function(e) {
    this.setState({ path: e });
  }

  render() {

    return <div>
      <BattleViewerOptions onBattlePlanChange={this.onBattlePlanChange} />
      <BattleCanvas backgroundImage={this.state.path} width={1250} height={900}/>
    </div>
  }
}

export default BattleViewer;