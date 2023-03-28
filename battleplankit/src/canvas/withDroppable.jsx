import React from 'react';
import { useDrop } from 'react-dnd';

const withDroppable = (WrappedComponent) => {
    
  return function Droppable(props) {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
      accept: 'shape',
      drop: (item, monitor) => {
        const e = monitor.getClientOffset();
        const dropCoordinates = { left: e.x, top: e.y };
        props.onDrop(item, dropCoordinates);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }));

    const backgroundColor = isOver ? (canDrop ? 'green' : 'red') : 'white';

    return (
      <div ref={drop} style={{ backgroundColor, width: '100%', height: '100%' }}>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withDroppable;