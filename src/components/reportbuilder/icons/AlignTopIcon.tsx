import { IconProps } from '../../pivotTable/Icons';
import Tooltip from '../../tooltip/Tooltip';

const AlignTopIcon = ({
  height,
  width,
  fill = 'transparent',
  stroke = '#000',
  className,
  onClick,
}: IconProps) => {
  return (
    <Tooltip content="Align Top" position="bottom">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        height={`${height}px`}
        width={`${width}px`}
        fill={fill}
        stroke={stroke}
        strokeWidth={6}
        className={className}
        viewBox="0 0 100 100"
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
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
            <line x1="77.5" y1="22.2" x2="22.5" y2="22.2" />
            <line x1="72.8" y1="33.3" x2="28" y2="33.3" />
            <line x1="51" y1="41.8" x2="51" y2="74.8" />
            <line x1="64" y1="48.8" x2="51" y2="41.8" />
            <line x1="51" y1="41.8" x2="38" y2="48.8" />
          </g>
        </g>
      </svg>
    </Tooltip>
  );
};

export default AlignTopIcon;
