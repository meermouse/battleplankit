import React, { Component } from 'react';
import withDraggable from './withDraggable';
//import './Shape.scss';

class Shape extends Component {
  render() {
    return (
      <div>
        {/* Render your customized shape here */}
      </div>
    );
  }
}

export default withDraggable(Shape);