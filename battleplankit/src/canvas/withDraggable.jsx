import React, { useRef, useLayoutEffect } from 'react';
import { useDrag } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { mmToPixels } from '../base/utility.js';

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
        const width = imageRef.current.dataset.width ? imageRef.current.dataset.width : imageRect.width;
        const height = imageRef.current.dataset.height ? imageRef.current.dataset.height : imageRect.height;

        let uid = imageRef.current.id == "" ? uuidv4() : imageRef.current.id;
        return {
          id: uid,
          type: props.type,
          width: width,
          height: height,
          clickOffsetX,
          clickOffsetY,
        };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    useLayoutEffect(() => {
      // This will run after the component has been fully rendered
    }, []);

    const opacity = isDragging ? 0.5 : 1;
    const top = props.top;
    const left = props.left;
    // Only convert if value is a string ending in 'mm', otherwise use as-is
    const width = (props.isMenu ?? false)
      ? null
      : (typeof props.width === 'string' && props.width.endsWith('mm')
          ? mmToPixels(props.width)
          : props.width);
    const height = (props.isMenu ?? false)
      ? null
      : (typeof props.height === 'string' && props.height.endsWith('mm')
          ? mmToPixels(props.height)
          : props.height);
    const className = `shape ${props.type}`;
    return (
      <div ref={drag} className={className} style={{ opacity, top, left, width, height }}>
        <WrappedComponent ref={imageRef} {...props} />
      </div>
    );
  };
};

export default withDraggable;
