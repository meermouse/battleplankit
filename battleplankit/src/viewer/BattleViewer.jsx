import React, { Component } from 'react'
import BattleCanvas from '../canvas/BattleCanvas.jsx'
import BattleViewerOptions from './BattleViewerOptions'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './BattleViewer.scss';
import Shape from '../canvas/Shape.jsx';

class BattleViewer extends Component {
  constructor(props) {
    super(props);
    this.onBattlePlanChange = this.onBattlePlanChange.bind(this);
    this.state = {
      path : '/Season1/battlelines_drawn.png',
      shapes: [
        { id: 1, type: 'circle' },
        { id: 2, type: 'square' },
        { id: 3, type: 'oval' }        
        // Add more shapes as needed
      ],
      canvasItems: [],
    }
  }

  onBattlePlanChange = function(e) {
    this.setState({ path: e });
  }

  handleDrop = (item, dropCoordinates) => {
    this.setState((prevState) => ({
      canvasItems: [...prevState.canvasItems, { ...item, ...dropCoordinates }],
    }));
  };

  render() {
    const { shapes, canvasItems } = this.state;
    return <div>
      <BattleViewerOptions onBattlePlanChange={this.onBattlePlanChange} />
      <DndProvider backend={HTML5Backend}>
        <div className="shape-container">
          {shapes.map((shape) => (
            <Shape className={'shape ' + shape.type} key={shape.id} id={shape.id} type={shape.type} />
          ))}
        </div>
        <BattleCanvas onDrop={this.handleDrop} backgroundImage={this.state.path} width={1250} height={900}>
        {canvasItems.map((item, index) => (
            <Shape 
              className={'shape ' + item.type} 
              left={item.left}
              top={item.top}
              key={index} 
              id={item.id} 
              type={item.type} />
        ))}
      </BattleCanvas>        
      </DndProvider>
    </div>
  }
}

export default BattleViewer;