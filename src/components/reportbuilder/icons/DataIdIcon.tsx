import { IconProps } from '../../pivotTable/Icons';

const DataIdIcon = ({
  height,
  width,
  fill = 'transparent',
  stroke = '#000',
  className,
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      height={`${height}px`}
      width={`${width}px`}
      fill={fill}
      stroke={stroke}
      strokeWidth={4}
      className={className}
      fontSize={73}
      viewBox="0 0 100 100"
    >
      <rect x="3.5" y="3.5" width="94" height="94" rx="6.8" ry="6.8" />
      <text transform="translate(32.3 73.6)">
        <tspan x="0" y="0">
          1
        </tspan>
      </text>
    </svg>
  );
};

export default DataIdIcon;
