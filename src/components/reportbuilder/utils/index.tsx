import { IconProps } from '../../pivotTable/Icons';
import {
  DataTextIcon,
  DataIdIcon,
  DataBooleanIcon,
  DataMoneyIcon,
  DataGuidIcon,
  DataCalendarIcon,
} from '../icons';

export const checkOverlap = (
  element1: HTMLDivElement,
  element2: HTMLDivElement,
) => {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
};

type IconType = 'text' | 'id' | 'guid' | 'money' | 'boolean' | 'calendar';

// Map icon types to React components
const iconMapping: Record<IconType, React.FC<IconProps>> = {
  text: DataTextIcon,
  id: DataIdIcon,
  guid: DataGuidIcon,
  money: DataMoneyIcon,
  boolean: DataBooleanIcon,
  calendar: DataCalendarIcon,
};

// Define the function
export function getIconComponent<T>(
  objects: T[],
  key: keyof T,
): React.FC<IconProps> {
  if (key == 'index' || key === 'unitsSold') {
    return iconMapping['id'];
  } else if (key === 'guid') {
    return iconMapping['guid'];
  } else if (key === 'isLoyalty') {
    return iconMapping['boolean'];
  } else if (key === 'revenue') {
    return iconMapping['money'];
  } else if (key === 'orderDate') {
    return iconMapping['calendar'];
  }
  return iconMapping['text'];
}
