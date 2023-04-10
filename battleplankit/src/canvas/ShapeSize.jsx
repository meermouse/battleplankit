import React, { Component } from 'react';
import withDraggable from './withDraggable';
import { stripMM } from '../base/utility.js';

class ShapeSize extends Component {
  render() {
    const { type, text } = this.props;
    const isCircle = type === 'circle';
    const isOval = type === 'oval';
    
    return (
      <div className={`${text ? 'shape-size' : ''}`} ref={this.props.forwardedRef} data-width={text} data-height={text}>
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