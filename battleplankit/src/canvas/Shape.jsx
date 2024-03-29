import React, { Component } from 'react';
import withDraggable from './withDraggable';

class Shape extends Component {
  render() {
    const { type, text } = this.props;
    const isCircle = type === 'circle';
    const isOval = type === 'oval';

    return (
      <div id={this.props.id} className={`${text ? 'shape-size' : ''}`} ref={this.props.forwardedRef}>
        {isCircle && <div className="circle-shape"></div>}
        {isOval && <div className="oval-shape"></div>}
        {text && <div className="shape-size-text">{text}</div>}
      </div>
    );
  }
}

const ShapeWithRef = React.forwardRef((props, ref) => {
  return <Shape {...props} forwardedRef={ref} />;
});

export default withDraggable(ShapeWithRef);