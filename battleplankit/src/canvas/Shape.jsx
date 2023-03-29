import React, { Component } from 'react';
import withDraggable from './withDraggable';
//import './Shape.scss';

class Shape extends Component {
  render() {
    const { forwardedRef, ...rest } = this.props;

    return (
      <div id={this.props.id} ref={forwardedRef}>
        {/* Render your customized shape here */}
      </div>
    );
  }
}

const ShapeWithRef = React.forwardRef((props, ref) => {
  return <Shape {...props} forwardedRef={ref} />;
});

export default withDraggable(ShapeWithRef);