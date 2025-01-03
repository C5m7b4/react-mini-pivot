import { IconProps } from '../../pivotTable/Icons';
import Tooltip from '../../tooltip/Tooltip';

const AlignBottomIcon = ({
  height,
  width,
  fill = 'transparent',
  stroke = '#000',
  className,
}: IconProps) => {
  return (
    <Tooltip content="Align Bottom" position="bottom">
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
            <line x1="22.5" y1="74.8" x2="77.5" y2="74.8" />
            <line x1="27.2" y1="63.7" x2="72" y2="63.7" />
            <line x1="49" y1="55.2" x2="49" y2="22.2" />
            <line x1="36" y1="48.2" x2="49" y2="55.2" />
            <line x1="49" y1="55.2" x2="62" y2="48.2" />
          </g>
        </g>
      </svg>
    </Tooltip>
  );
};

export default AlignBottomIcon;
