import React, { Component } from 'react'
import BattleShapeSelecter from './BattleShapeSelecter';
class BattleShapeConstructor extends Component {
    constructor(props) {
        super(props);
      }
    render() {
        return <div className = "shape-constructor">
            <div className="shape-base-container">
              <BattleShapeSelecter />
            </div>
        </div> 
    }
}

export default BattleShapeConstructor;