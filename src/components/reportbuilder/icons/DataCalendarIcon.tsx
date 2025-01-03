import { IconProps } from '../../pivotTable/Icons';

const DataCalendarIcon = ({
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
      viewBox="0 0 100 100"
    >
      <rect x="3.5" y="3.5" width="94" height="94" rx="6.8" ry="6.8" />
      <path d="M75.6,22h-8.1v-4.7c0-1-.8-1.8-1.8-1.8h-1.4c-1,0-1.8.8-1.8,1.8v4.7h-28v-4.7c0-1-.8-1.8-1.8-1.8h-1.4c-1,0-1.8.8-1.8,1.8v4.7h-5.1c-5.2,0-9.4,4.2-9.4,9.4v48.2c0,5.2,4.2,9.4,9.4,9.4h51.2c5.2,0,9.4-4.2,9.4-9.4V31.4c0-5.2-4.2-9.4-9.4-9.4Z" />
      <rect x="24.5" y="33.5" width="12" height="11" />
      <rect x="24.5" y="50.5" width="12" height="11" />
      <rect x="24.5" y="68.5" width="12" height="11" />
      <rect x="45.5" y="33.5" width="12" height="11" />
      <rect x="45.5" y="50.5" width="12" height="11" />
      <rect x="45.5" y="68.5" width="12" height="11" />
      <rect x="64.5" y="33.5" width="12" height="11" />
      <rect x="64.5" y="50.5" width="12" height="11" />
      <rect x="64.5" y="68.5" width="12" height="11" />
    </svg>
  );
};

export default DataCalendarIcon;
