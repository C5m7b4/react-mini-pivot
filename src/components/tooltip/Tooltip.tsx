import React, { useState } from 'react';

interface TooltipProps {
  content: string; // Tooltip text
  position?: 'top' | 'bottom' | 'left' | 'right'; // Positioning
  children: React.ReactNode; // Wrapped element
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute ${positionClasses[position]} p-2 bg-gray-800 text-white text-sm rounded shadow-lg
                      transition-opacity duration-500 ease-in-out opacity-100 transform scale-100 whtespace-nowrap  text-center px-4`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
