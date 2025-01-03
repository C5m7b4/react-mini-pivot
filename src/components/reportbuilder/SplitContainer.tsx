import { useState, useEffect } from 'react';

interface SplitContainerProps {
  topChild: React.ReactNode;
  bottomChild: React.ReactNode;
  parentHeight: number;
}

const SplitContainer = ({
  topChild,
  bottomChild,
  parentHeight = 50,
}: SplitContainerProps) => {
  const [dividerPosition, setDividerPosition] = useState(parentHeight);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const container = document.getElementById('split-container');
      if (container) {
        const rect = container.getBoundingClientRect();
        const newDividerPosition = ((e.clientY - rect.top) / rect.height) * 100;
        setDividerPosition(newDividerPosition);
      }
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div id="split-container" className="flex flex-col relative w-full h-full">
      <div
        className="split-container-top w-full"
        style={{ height: `${dividerPosition}%` }}
      >
        {topChild}
      </div>
      <div
        className="divider absolute w-full bg-slate-600 cursor-row-resize"
        onMouseDown={handleMouseDown}
        style={{
          top: `${dividerPosition}%`,
          height: '8px',
          opacity: '0.8',
          zIndex: '50',
        }}
      ></div>
      <div
        className="split-container-bottom flex-1 w-full"
        style={{ height: `${100 - dividerPosition}%` }}
      >
        {bottomChild}
      </div>
    </div>
  );
};

export default SplitContainer;
