import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

const withDraggable = (WrappedComponent) => {
  return function Draggable(props) {
    const imageRef = useRef(null);
    const id = props.id;
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'shape',
      item: () => {
        if (!imageRef.current) {
          return;
        }

        const imageRect = imageRef.current.getBoundingClientRect();
        const clickOffsetX = event.clientX - imageRect.left;
        const clickOffsetY = event.clientY - imageRect.top;

        return {
          id: id,
          type: props.type,
          width: imageRect.width,
          height: imageRect.height,
          clickOffsetX,
          clickOffsetY,
        };
      },
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
        <WrappedComponent ref={imageRef} {...props} />
      </div>
    );
  };
};

export default withDraggable;
