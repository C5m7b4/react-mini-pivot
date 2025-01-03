import { useState, useEffect, useRef, useContext } from 'react';
// import { useClickOutside } from '../../pivotTable/hooks/useClickOutside';
import { ToolProps } from '../types';
import { useAppContext } from '../hooks/useAppContext';
import { AppContext } from '../AppProvider';

const DataTool = ({
  x,
  y,
  fieldType,
  text,
  queryId,
  fontWeight,
  fontStyle,
  fontSize,
  fontVariant,
  width,
  height,
  textAlign,
  lineHeight,
  paddingLeft,
  paddingRight,
  paddingBottom,
  paddingTop,
  textDecoration,
}: ToolProps) => {
  // const { activeTool, setActiveTool } = useAppContext();
  const context = useContext(AppContext);
  const { activeTool, setActiveTool } = context!;
  const [position, setPosition] = useState({ x: x, y: y });
  const [size, setSize] = useState({ width: width, height: height });
  const [attributes, setAttributes] = useState({
    textAlign: textAlign,
    lineHeight: lineHeight,
    fontWeight: fontWeight,
    fontStyle: fontStyle,
    fontSize: fontSize,
    fontVariant: fontVariant,
    text: text,
    fieldType: fieldType,
    paddingLeft: paddingLeft,
    paddingRight: paddingRight,
    paddingBottom: paddingBottom,
    paddingTop: paddingTop,
    textDecoration: textDecoration,
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTool && activeTool.queryId) {
      if (queryId === activeTool.queryId) {
        setPosition({ x: activeTool.x, y: activeTool.y });
        setSize({ width: activeTool.width, height: activeTool.height });
        setAttributes({
          textAlign: activeTool.textAlign,
          lineHeight: activeTool.lineHeight,
          fontWeight: activeTool.fontWeight,
          fontSize: activeTool.fontSize,
          fontVariant: activeTool.fontVariant,
          text: activeTool.text,
          fieldType: activeTool.fieldType,
          paddingLeft: activeTool.paddingLeft,
          paddingRight: activeTool.paddingRight,
          paddingBottom: activeTool.paddingBottom,
          paddingTop: activeTool.paddingTop,
          fontStyle: activeTool.fontStyle,
          textDecoration: activeTool.textDecoration,
        });
      }
    }
  }, [activeTool]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const l = ref.current?.offsetLeft;
    const t = ref.current?.offsetTop;

    const startX = e.pageX;
    const startY = e.pageY;

    const drag = (evt: MouseEvent) => {
      evt.preventDefault();
      if (ref.current) {
        const newLeft = l! + evt.pageX - startX;
        const newTop = t! + evt.pageY - startY;
        setPosition({ x: newLeft, y: newTop });
        const updatedActiveTool = { ...activeTool, x: newLeft, y: newTop };
        setActiveTool(updatedActiveTool);
      }
    };

    const mouseup = () => {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', mouseup);
    };

    document.addEventListener('mouseup', mouseup);
    document.addEventListener('mousemove', drag);
  };

  const handleToolClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const tool: ToolProps = {
      fieldType: fieldType,
      x: parseInt(position.x.toString()),
      y: parseInt(position.y.toString()),
      width: parseInt(width.toString()),
      height: parseInt(height.toString()),
      fontSize: fontSize,
      fontWeight: fontWeight,
      textAlign: textAlign,
      fontVariant: fontVariant,
      text: text,
      queryId: queryId,
      lineHeight: lineHeight,
      paddingLeft: paddingLeft,
      paddingRight: paddingRight,
      paddingBottom: paddingBottom,
      paddingTop: paddingTop,
      fontStyle: fontStyle,
      textDecoration: textDecoration,
    };
    setActiveTool(tool);

    if (ref.current) {
      ref.current.style.border = '1px solid black';
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const width = ref.current?.clientWidth;

      const startX = e.pageX;

      const drag = (evt: MouseEvent) => {
        evt.preventDefault();
        if (ref.current) {
          const newWidth = width! + evt.pageX - startX;
          // ref.current.style.width = newWidth + 'px';
          setSize({ width: newWidth, height: size.height });
          const tool: ToolProps = {
            fieldType: fieldType,
            x: parseInt(position.x.toString()),
            y: parseInt(position.y.toString()),
            width: newWidth,
            height: parseInt(height.toString()),
            fontSize: fontSize,
            fontWeight: fontWeight,
            textAlign: textAlign,
            fontVariant: fontVariant,
            text: text,
            queryId: queryId,
            lineHeight: lineHeight,
            paddingLeft: paddingLeft,
            paddingRight: paddingRight,
            paddingBottom: paddingBottom,
            paddingTop: paddingTop,
            fontStyle: fontStyle,
            textDecoration: textDecoration,
          };
          setActiveTool(tool);
        }
      };

      const resize_mouseup = () => {
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', resize_mouseup);
      };

      document.addEventListener('mouseup', resize_mouseup);
      document.addEventListener('mousemove', drag);
    }
  };

  return (
    <div
      ref={ref}
      query-id={queryId}
      className="absolute cursor-pointer"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        textAlign: attributes.textAlign,
        lineHeight: `${attributes.lineHeight}px`,
        fontWeight: attributes.fontWeight,
        fontStyle: attributes.fontStyle,
        fontSize: `${attributes.fontSize}px`,
        fontVariant: attributes.fontVariant,
        paddingLeft: attributes.paddingLeft + 'px',
        paddingRight: attributes.paddingRight + 'px',
        paddingBottom: attributes.paddingBottom + 'px',
        paddingTop: attributes.paddingTop + 'px',
        border: `${queryId === activeTool?.queryId ? '1px solid black' : 'none'}`,
        textDecoration: attributes.textDecoration,
      }}
      onClick={handleToolClick}
    >
      <div onMouseDown={handleMouseDown}>{attributes.fieldType}</div>
      <div
        className="absolute top-0 right-0 p-1 text-white text-xs cursor-col-resize"
        onMouseDown={handleResizeMouseDown}
      >
        &nbsp;
      </div>
    </div>
  );
};

export default DataTool;
