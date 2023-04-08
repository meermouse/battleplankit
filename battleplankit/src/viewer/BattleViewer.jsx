import React, { Component } from 'react'
import BattleCanvas from '../canvas/BattleCanvas.jsx'
import BattleViewerOptions from './BattleViewerOptions'
import BattleShapeConstructor from './BattleShapeConstructor.jsx'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './BattleViewer.scss';
import Shape from '../canvas/Shape.jsx';
import { MAP_WIDTH, MAP_HEIGHT, mmToPixels } from '../base/utility.js';

class BattleViewer extends Component { 
  constructor(props) {
    super(props);
    this.onBattlePlanChange = this.onBattlePlanChange.bind(this);
    this.state = {
      path : '/Season2/TheJawsOfGallet.webp',
      shapes: [
        { type: 'circle', height: 50, width: 50 },
        { type: 'oval', height: 50, width: 80 }        
        // Add more shapes as needed
      ],
      canvasItems: [],
    }
  }

  onBattlePlanChange = function(e) {
    this.setState({ path: e });
  }

  handleDrop = (item, dropCoordinates) => {
    this.setState((prevState) => {
      const itemExists = prevState.canvasItems.some(
        (canvasItem) => canvasItem.id === item.id
      );
    
      if (itemExists) {
        // If the item exists, update the item
        return {
          canvasItems: prevState.canvasItems.map((canvasItem) =>
            canvasItem.id === item.id ? { ...item, ...dropCoordinates } : canvasItem
          ),
        };
      } else {
        // If the item does not exist, add it to the collection
        return {
          canvasItems: [...prevState.canvasItems, { ...item, ...dropCoordinates }],
        };
      }
    });
  };

  render() {
    const { shapes, canvasItems } = this.state;
    return <div>
      <BattleViewerOptions onBattlePlanChange={this.onBattlePlanChange} />
      <DndProvider backend={HTML5Backend}>
        <BattleShapeConstructor />
        <BattleCanvas onDrop={this.handleDrop} backgroundImage={this.state.path} width={MAP_WIDTH} height={MAP_HEIGHT}>
        {canvasItems.map((item, index) => (
            <Shape 
              className={'shape ' + item.type} 
              width={item.width}
              height={item.height}
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