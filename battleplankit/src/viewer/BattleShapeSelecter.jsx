import React, { Component } from 'react'
import BaseShape from '../canvas/BaseShape.jsx';
import ShapeSize from '../canvas/ShapeSize.jsx';
import './BattleShapeSelecter.scss';
import { stripMM } from '../base/utility.js';

class BattleShapeSelecter extends Component {
    constructor(props) {
        super(props);
        this.state = {
          baseShapes: [
            { type: 'circle', height: 50, width: 50 },
            { type: 'oval', height: 50, width: 80 }        
            // Add more shapes as needed
          ],
          shapeSizes: [
            {
              type: 'circle',
              hidden: true,
              sizes: ['25mm', '32mm', '40mm', '50mm', '60mm', '100mm', '130mm', '160mm']
            },
            {
              type: 'oval',
              hidden: true,
              sizes: ['60x35mm', '75x42mm', '90x52mm', '105x70mm', '120x92mm', '170x105mm']
            },
          ]
        }
      };

      onBaseShapeClick = (e, sizeType) => {
        this.setState(prevState => {
          const shapeSizes = prevState.shapeSizes.map(shapeSize => {
            if (shapeSize.type === sizeType) {
              return {
                ...shapeSize,
                hidden: !shapeSize.hidden
              };
            } else {
              return {
                ...shapeSize,
                hidden: true
              };
            }
            return shapeSize;
          });
          return { shapeSizes };
        });
      };

    render() {
        const { baseShapes, shapeSizes } = this.state;
        return <>
        {
          baseShapes.map((baseShape, index) => (
          <div className="shape-base" key={index}>
              <BaseShape className={'shape ' + baseShape.type} key={index} id={baseShape.id} type={baseShape.type} onClick={this.onBaseShapeClick} />
          </div>
        ))}
        {
          shapeSizes.map((shapeSize, index1) => (
          <div className={"shape-size-base " + (shapeSize.hidden ? 'hidden' : '')} key={index1}>
              {shapeSize.sizes.map((shapeSizeSize, index2) => (
                <span className='shape-size-base-shape' key={index2}>
                  <ShapeSize 
                    text={shapeSizeSize} 
                    className={'shape-size shape ' + shapeSize.type} 
                    id={shapeSize.id} 
                    type={shapeSize.type} 
                    width={stripMM(shapeSizeSize)}
                    height={stripMM(shapeSizeSize)}
                    isMenu={true}
                    />
                </span>
              ))}
          </div>
        ))}
        </>
    }
}

export default BattleShapeSelecter;