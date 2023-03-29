import React, { Component } from 'react';
import withDroppable from './withDroppable';
import './BattleCanvas.scss';

class BattleCanvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.drawCanvas(this.props.backgroundImage);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.backgroundImage !== this.props.backgroundImage) {
      this.drawCanvas(this.props.backgroundImage);
    }
  }

  componentWillUnmount() {
    this.cleanup();
  }

  drawCanvas(backgroundImage) {
    const canvas = this.canvasRef.current;
    canvas.width = this.props.width;
    canvas.height = this.props.height;
    const context = canvas.getContext('2d');

    const image = new Image();
    image.src = backgroundImage;
    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    let isDrawing = false;
    let startX = 0;
    let startY = 0;

    const startDrawing = (event) => {
      isDrawing = true;
      startX = event.clientX - canvas.offsetLeft;
      startY = event.clientY - canvas.offsetTop;
    };

    const drawShape = (event) => {
      if (isDrawing) {
        const x = event.clientX - canvas.offsetLeft;
        const y = event.clientY - canvas.offsetTop;

        // Draw the shape on the canvas here
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(x, y);
        context.stroke();

        startX = x;
        startY = y;
      }
    };

    const stopDrawing = () => {
      isDrawing = false;
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', drawShape);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    this.cleanup = () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', drawShape);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }

  getCanvasBoundingClientRect() {
    return this.canvasRef.current.getBoundingClientRect();
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <div className='battleCanvas'>
          {children}
        </div>
        <canvas ref={this.canvasRef} width={this.props.width} height={this.props.height} />
      </div>
    );
  }
}

export default withDroppable(BattleCanvas);