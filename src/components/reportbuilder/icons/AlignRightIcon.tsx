import { IconProps } from '../../pivotTable/Icons';
import Tooltip from '../../tooltip/Tooltip';

const AlignRightIcon = ({
  height,
  width,
  fill = 'transparent',
  stroke = '#000',
  className,
}: IconProps) => {
  return (
    <Tooltip content="Align Right" position="bottom">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        height={`${height}px`}
        width={`${width}px`}
        fill={fill}
        stroke={stroke}
        strokeWidth={4}
        className={className}
        viewBox="0 0 100 100"
      >
        <g id="Layer_1">
          <rect
            strokeWidth="6"
            x="3.5"
            y="3.5"
            width="94"
            height="94"
            rx="17.1"
            ry="17.1"
          />
          <g>
            <line x1="76.3" y1="76" x2="76.3" y2="21" />
            <line x1="65.2" y1="71.3" x2="65.2" y2="26.5" />
            <line x1="56.7" y1="49.5" x2="23.7" y2="49.5" />
            <line x1="49.7" y1="62.5" x2="56.7" y2="49.5" />
            <line x1="56.7" y1="49.5" x2="49.7" y2="36.5" />
          </g>
        </g>
      </svg>
    </Tooltip>
  );
};

export default AlignRightIcon;
