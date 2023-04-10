import React, { Component } from 'react';
//import './Shape.scss';

class BaseShape extends Component {
  handleClick = (e, sizeType) => {
    if (this.props.onClick) {
      this.props.onClick(e, sizeType);
    }
  }

  render() {
    const { forwardedRef, ...rest } = this.props;
    const width = this.props.width;
    const height = this.props.height;
    return (
      <div {...this.props} id={this.props.id} ref={forwardedRef} style={{ height, width }} onClick={(e) => {this.handleClick(e, this.props.type)}}>
        {/* Render your customized shape here */}
      </div>
    );
  }
}

export default BaseShape;
