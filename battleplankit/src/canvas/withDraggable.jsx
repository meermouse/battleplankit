import React from 'react';
import { useDrag } from 'react-dnd';

const withDraggable = (WrappedComponent) => {
  return function Draggable(props) {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'shape',
      item: { id: props.id, type: props.type },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    const opacity = isDragging ? 0.5 : 1;
    const top = props.top;
    const left = props.left;
    const className = `shape ${props.type}`;

    return (
      <div ref={drag} className={className} style={{ opacity, top, left }}>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withDraggable;
