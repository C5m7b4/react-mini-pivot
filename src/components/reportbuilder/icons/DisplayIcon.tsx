import { IconProps } from '../../pivotTable/Icons';

const DisplayIcon = ({
  width,
  height,
  className,
  fill = 'transparent',
  stroke = '#000',
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      height={`${height}px`}
      width={`${width}px`}
      fill={fill}
      stroke={stroke}
      className={className}
      strokeWidth={6}
      viewBox="0 0 100 100"
    >
      <rect x="3.5" y="3.5" width="94" height="94" rx="6.8" ry="6.8" />
      <line x1="16" y1="83" x2="85" y2="83" />
      <rect x="13.5" y="13.5" width="73" height="53" rx="9.5" ry="9.5" />
      <rect x="46.5" y="66.5" width="7" height="16" />
    </svg>
  );
};

export default DisplayIcon;
