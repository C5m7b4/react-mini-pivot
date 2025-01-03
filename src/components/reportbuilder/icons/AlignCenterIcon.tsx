import { IconProps } from '../../pivotTable/Icons';
import Tooltip from '../../tooltip/Tooltip';

const AlignCenterIcon = ({
  height,
  width,
  fill = 'transparent',
  stroke = '#000',
  className,
}: IconProps) => {
  return (
    <Tooltip content="Align Center" position="bottom">
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
        <line x1="88.5" y1="83.5" x2="88.5" y2="13.5" />
        <line x1="74.5" y1="77.5" x2="74.5" y2="20.5" />
        <line x1="16.5" y1="13.5" x2="16.5" y2="83.5" />
        <line x1="30.5" y1="19.5" x2="30.5" y2="76.5" />
        <line x1="44.5" y1="19.5" x2="44.5" y2="76.5" />
        <line x1="59.5" y1="19.5" x2="59.5" y2="76.5" />
      </svg>
    </Tooltip>
  );
};

export default AlignCenterIcon;
