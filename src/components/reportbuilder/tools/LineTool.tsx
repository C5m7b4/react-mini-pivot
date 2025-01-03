import { useState, useRef } from 'react';
import { useClickOutside } from '../../pivotTable/hooks/useClickOutside';
import { ToolProps } from '../types';
import { useAppContext } from '../hooks/useAppContext';

const LineTool = ({ x, y, fieldType }: ToolProps) => {
  const { setActiveTool } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState({ x: x, y: y });
  const ref = useClickOutside(() => {
    setIsEditing(false);
    if (hrRef.current) {
      hrRef.current.style.background = 'none';
      hrRef.current.style.backgroundImage = 'none';
    }
  });
  const titleRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const hrRef = useRef<HTMLHRElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);

    const l = ref.current?.offsetLeft;
    const t = ref.current?.offsetTop;

    const startX = e.pageX;
    const startY = e.pageY;

    const drag = (evt: MouseEvent) => {
      evt.preventDefault();
      if (ref.current) {
        const newL = l! + evt.pageX - startX;
        ref.current.style.left = newL + 'px';
        const newT = t! + evt.pageY - startY;
        ref.current.style.top = newT + 'px';
      }
    };

    const mouseup = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', mouseup);
    };

    document.addEventListener('mouseup', mouseup);
    document.addEventListener('mousemove', drag);
  };

  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const width = hrRef.current?.clientWidth;
    // const height = ref.current?.clientHeight;

    const startX = e.pageX;
    // const startY = e.pageY;

    const resize_drag = (evt: MouseEvent) => {
      evt.preventDefault();
      if (hrRef.current) {
        const newWidth = width! + evt.pageX - startX;
        hrRef.current.style.width = newWidth + 'px';
        // const newHeight = height! + evt.pageY - startY;
        // ref.current.style.height = newHeight + 'px';
      }
    };

    const resize_mouseup = () => {
      document.removeEventListener('mousemove', resize_drag);
      document.removeEventListener('mouseup', resize_mouseup);
    };

    document.addEventListener('mouseup', resize_mouseup);
    document.addEventListener('mousemove', resize_drag);
  };

  const handleToolClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsEditing(true);
    const box = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const tool: ToolProps = {
      fieldType: fieldType,
      x: box.left,
      y: box.top,
      width: box.width,
      height: box.height,
      fontSize: 16,
      fontWeight: 'normal',
      text: '',
      queryId: '',
    };
    setActiveTool(tool);
    if (hrRef.current) {
      hrRef.current.style.background = `linear-gradient(to right, black 2px, transparent 2px) 0, 0,
        linear-gradient(to right, black 2px, transparent 2px) 0 100%,
      linear-gradient(to left, black 2px, transparent 2px) 100% 0,
      linear-gradient(to left, black 2px, transparent 2px) 100% 100%,
      linear-gradient(to bottom, black 2px, transparent 2px) 0 0,
      linear-gradient(to bottom, black 2px, transparent 2px) 100% 0,
      linear-gradient(to top, black 2px, transparent 2px) 0 100%,
      linear-gradient(to top, black 2px, transparent 2px) 100% 100%`;
      hrRef.current.style.backgroundRepeat = 'no-repeat';
      hrRef.current.style.backgroundSize = '20px 20px';
      //hrRef.current.style.transform = 'translateY(-50%)';
      hrRef.current.style.height = '10px';
    }
  };

  return (
    <div
      ref={ref}
      className="absolute flex flex-col justify-center"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      {isEditing ? (
        <div
          ref={titleRef}
          className="bg-slate-100 rounded-t-md cursor-grab"
          style={{ width: '100%', height: '10px' }}
          onMouseDown={handleMouseDown}
        >
          &nbsp;
        </div>
      ) : null}
      <div>
        <hr
          ref={hrRef}
          className="cursor-pointer"
          onClick={handleToolClick}
          style={{ width: '200px', height: '10px' }}
        />
      </div>
      {isEditing ? (
        <div
          className="flex justify-end text-black select-none"
          style={{ width: '100%', height: '10px' }}
        >
          <div
            onMouseDown={handleResizeMouseDown}
            ref={resizeRef}
            className="h-full bg-slate-200 cursor-nwse-resize"
            style={{ width: '20px', height: '10px' }}
          >
            &nbsp;
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LineTool;
