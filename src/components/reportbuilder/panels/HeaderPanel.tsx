import { useState, useRef } from 'react';
import LineTool from '../tools/LineTool';
import LabelTool from '../tools/LabelTool';
import { checkOverlap } from '../utils';
import { generateId } from '../../../utils/id';
import { ToolProps } from '../types';

const HeaderPanel = () => {
  const [tools, setTools] = useState<ToolProps[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const div = e.target as HTMLDivElement;
    const isInDropZone = checkOverlap(
      div,
      document.querySelector('[query-id="canvas"]') as HTMLDivElement,
    );
    if (!isInDropZone) {
      const currentTransform = { x: 0, y: 0 };
      div.style.transform = `translate(${currentTransform.x}px, ${currentTransform.y}px)`;
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const fieldType = e.dataTransfer.getData('fieldType');
    e.preventDefault();

    if (ref.current) {
      const box = ref.current.getBoundingClientRect();
      const obj: ToolProps = {
        fieldType: fieldType,
        x: e.clientX - box.left,
        y: e.clientY - box.top,
        queryId: 'tool-' + generateId(),
        text: fieldType,
        fontWeight: 'normal',
        fontSize: 16,
      };
      setTools([...tools, obj]);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.target as HTMLDivElement).style.border = '0px solid black';
  };

  return (
    <div
      ref={ref}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      className="relative h-full w-full"
      query-id="header-panel"
    >
      {tools.map((tool, idx) => {
        return (
          <div key={`tool-${idx}`}>
            {tool.fieldType === 'Line' ? (
              <LineTool fieldType={tool.fieldType} y={tool.y} x={tool.x} />
            ) : null}
            {tool.fieldType === 'Label' ? (
              <LabelTool fieldType={tool.fieldType} y={tool.y} x={tool.x} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default HeaderPanel;
