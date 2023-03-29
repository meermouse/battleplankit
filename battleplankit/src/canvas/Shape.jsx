import React, { Component } from 'react';
import withDraggable from './withDraggable';
//import './Shape.scss';

class Shape extends Component {
  render() {
    const { forwardedRef, ...rest } = this.props;
    const width = this.props.width;
    const height = this.props.height;
    return (
      <div id={this.props.id} ref={forwardedRef} style={{ height, width }}>
        {/* Render your customized shape here */}
      </div>
    );
  }
}

const ShapeWithRef = React.forwardRef((props, ref) => {
  return <Shape {...props} forwardedRef={ref} />;
});

export default withDraggable(ShapeWithRef);