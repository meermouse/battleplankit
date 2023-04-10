import React, { Component } from 'react';
import withDraggable from './withDraggable';
import { stripMM, parseDimensions } from '../base/utility.js';

class ShapeSize extends Component {
  render() {
    const { type, text } = this.props;
    const isCircle = type === 'circle';
    const isOval = type === 'oval';
    let widthText = text;
    let heightText = text;
    if(isOval) {
      let parsedDimenstions = parseDimensions(text);
      if(parsedDimenstions) {
        widthText = parsedDimenstions.width;
        heightText = parsedDimenstions.height;
      }
    }

    return (
      <div className={`${text ? 'shape-size' : ''}`} ref={this.props.forwardedRef} data-width={widthText} data-height={heightText}>
        {isCircle && <div className="circle-shape"></div>}
        {isOval && <div className="oval-shape"></div>}
        {text && <div className="shape-size-text">{text}</div>}
      </div>
    );
  }
}

const ShapeWithRef = React.forwardRef((props, ref) => {
  return <ShapeSize {...props} forwardedRef={ref} />;
});

export default withDraggable(ShapeWithRef);