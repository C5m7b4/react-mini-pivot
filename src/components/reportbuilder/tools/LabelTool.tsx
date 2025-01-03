import { useState, useRef } from 'react';
import { useClickOutside } from '../../pivotTable/hooks/useClickOutside';
import { useAppContext } from '../hooks/useAppContext';
import { useEffect } from 'react';
import { ToolProps } from '../types';

const LabelTool = ({ x, y, fieldType }: ToolProps) => {
  const { activeTool, setActiveTool, left, setLeft } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingText, setIsEditintText] = useState(false);
  const [text, setText] = useState('label');
  const [position, setPosition] = useState({ x: x, y: y });
  const ref = useClickOutside(() => {
    setIsEditing(false);
    if (labelRef.current) {
      labelRef.current.style.background = 'none';
      labelRef.current.style.backgroundImage = 'none';
    }
  });

  const titleRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLHRElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {}, [activeTool]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const l = ref.current?.offsetLeft;
    const t = ref.current?.offsetTop;

    const startX = e.pageX;
    const startY = e.pageY;

    const drag = (evt: MouseEvent) => {
      evt.preventDefault();
      if (ref.current) {
        setPosition({ x: l! + evt.pageX - startX, y: t! + evt.pageY - startY });
      }
    };

    const mouseup = () => {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', mouseup);
    };

    document.addEventListener('mouseup', mouseup);
    document.addEventListener('mousemove', drag);
  };

  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const width = labelRef.current?.clientWidth;
    // const height = ref.current?.clientHeight;

    const startX = e.pageX;
    // const startY = e.pageY;

    const resize_drag = (evt: MouseEvent) => {
      evt.preventDefault();
      if (labelRef.current) {
        const newWidth = width! + evt.pageX - startX;
        labelRef.current.style.width = newWidth + 'px';
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

    if (labelRef.current) {
      labelRef.current.style.background = `linear-gradient(to right, black 2px, transparent 2px) 0, 0,
        linear-gradient(to right, black 2px, transparent 2px) 0 100%,
      linear-gradient(to left, black 2px, transparent 2px) 100% 0,
      linear-gradient(to left, black 2px, transparent 2px) 100% 100%,
      linear-gradient(to bottom, black 2px, transparent 2px) 0 0,
      linear-gradient(to bottom, black 2px, transparent 2px) 100% 0,
      linear-gradient(to top, black 2px, transparent 2px) 0 100%,
      linear-gradient(to top, black 2px, transparent 2px) 100% 100%`;
      labelRef.current.style.backgroundRepeat = 'no-repeat';
      labelRef.current.style.backgroundSize = '20px 20px';
      //hrRef.current.style.transform = 'translateY(-50%)';
      labelRef.current.style.height = '10px';
    }
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsEditintText(true);
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
      <div
        ref={labelRef}
        className="cursor-pointer"
        onClick={handleToolClick}
        onDoubleClick={handleDoubleClick}
        style={{ width: '200px', height: '10px' }}
      >
        {isEditingText ? (
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <span>{text}</span>
        )}
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

export default LabelTool;
