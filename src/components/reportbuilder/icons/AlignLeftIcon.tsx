import { IconProps } from '../../pivotTable/Icons';
import Tooltip from '../../tooltip/Tooltip';

const AlignLeftIcon = ({
  height,
  width,
  fill = 'transparent',
  stroke = '#000',
  className,
}: IconProps) => {
  return (
    <Tooltip content="Align Left" position="bottom">
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
          <line x1="23.7" y1="21" x2="23.7" y2="76" />
          <line x1="34.8" y1="25.7" x2="34.8" y2="70.5" />
          <line x1="43.3" y1="47.5" x2="76.3" y2="47.5" />
          <line x1="50.3" y1="34.5" x2="43.3" y2="47.5" />
          <line x1="43.3" y1="47.5" x2="50.3" y2="60.5" />
        </g>
      </svg>
    </Tooltip>
  );
};

export default AlignLeftIcon;
