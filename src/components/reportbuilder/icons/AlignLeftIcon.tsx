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
        strokeWidth={6}
        className={className}
        viewBox="0 0 100 100"
      >
        <rect x="3.5" y="3.5" width="94" height="94" rx="6.8" ry="6.8" />
        <line x1="15.5" y1="13.5" x2="15.5" y2="83.5" />
        <line x1="29.5" y1="19.5" x2="29.5" y2="76.5" />
        <line x1="46.5" y1="47.5" x2="88.5" y2="47.5" />
        <line x1="53.5" y1="34.5" x2="46.5" y2="47.5" />
        <line x1="46.5" y1="47.5" x2="53.5" y2="60.5" />
      </svg>
    </Tooltip>
  );
};

export default AlignLeftIcon;
