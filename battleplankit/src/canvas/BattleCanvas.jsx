import React, { Component } from 'react'

import ReactCanvasPaint from 'react-canvas-paint'
import 'react-canvas-paint/dist/index.css'
import './BattleCanvas.scss';

class BattleCanvas extends Component {
  render() {
    return <div className='battleCanvas-container'>
      <ReactCanvasPaint width={1250} height={1250} />
    </div>
  }
}

export default BattleCanvas;