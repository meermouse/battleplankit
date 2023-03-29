import React, {useRef } from 'react';
import { useDrop } from 'react-dnd';

const withDroppable = (WrappedComponent) => {
  return function Droppable(props) {
    const wrappedComponentRef = useRef(null);

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
      accept: 'shape',
      drop: (item, monitor) => {
        if (!wrappedComponentRef.current) {
          return;
        }

        const e = monitor.getClientOffset();
        const wrappedComponentRect = wrappedComponentRef.current.getCanvasBoundingClientRect();
        const dropCoordinates = {
          left: e.x - wrappedComponentRect.left,
          top: e.y - wrappedComponentRect.top,
        };

        props.onDrop(item, dropCoordinates);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }));
    const backgroundColor = isOver ? (canDrop ? 'green' : 'red') : 'white';
    // ... rest of the Droppable component ...

    return (
      <div ref={drop} style={{ backgroundColor, width: '100%', height: '100%' }}>
        <WrappedComponent ref={wrappedComponentRef} {...props} />
      </div>
    );
  };
};

export default withDroppable;