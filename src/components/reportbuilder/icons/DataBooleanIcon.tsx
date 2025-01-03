import { IconProps } from '../../pivotTable/Icons';

const DataBooleanIcon = ({
  height,
  width,
  stroke = '#000',
  fill = 'transparent',
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={`${height}px`}
      width={`${width}px`}
      stroke={stroke}
      fill={fill}
      strokeWidth={4}
      version="1.1"
      viewBox="0 0 100 100"
    >
      <rect x="3.5" y="3.5" width="94" height="94" rx="6.8" ry="6.8" />
      <text transform="translate(32.3 73.6)">
        <tspan x="0" y="0" fontSize={73}>
          ?
        </tspan>
      </text>
    </svg>
  );
};

export default DataBooleanIcon;
