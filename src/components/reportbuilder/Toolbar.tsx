import LabelIcon from './images/LabelIcon.png';
import LineIcon from './images/LineIcon.png';
import StringIcon from './images/StringIcon.png';
import MoneyIcon from './images/MoneyIcon.png';
import {
  DisplayIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
} from './icons';
import { useAppContext } from './hooks/useAppContext';
import { useEffect } from 'react';

const Toolbar = () => {
  const { liveMode, setLiveMode } = useAppContext();
  const iconClass =
    'border rounded-md shadow-md px-2 py-2 cursor-pointer transition-all duration-500 hover:bg-gray-100';

  useEffect(() => {
    const canvas = document.querySelector(
      '[query-id="canvas"]',
    ) as HTMLDivElement;
    const masterToolbar = document.querySelector('[query-id="master-toolbar"]');
    const box = masterToolbar?.getBoundingClientRect();
    if (box && canvas) {
      const height = window.innerHeight - (box.top + box.height) - 50;
      canvas.style.height = height + 'px';
    }
  }, []);

  const handleClick = () => {
    setLiveMode(!liveMode);
  };

  return (
    <div
      query-id="master-toolbar"
      className="w-full border rounded-lg shadow-md p-2 mb-2 flex justify-between"
    >
      <div className="flex gap-4">
        <img className={iconClass} query-id="LabelIcon" src={LabelIcon} />
        <img className={iconClass} query-id="LineIcon" src={LineIcon} />
      </div>
      <div className="flex gap-4">
        <AlignLeftIcon height={30} width={30} className="cursor-pointer" />
        <AlignCenterIcon height={30} width={30} className="cursor-pointer" />
        <AlignRightIcon height={30} width={30} className="cursor-pointer" />
      </div>
      <div className="flex gap-4" onClick={handleClick}>
        <div>
          <DisplayIcon
            height={30}
            width={30}
            className="hover:bg-slate-100 tranition-all duration-500 cursor-pointer"
          />
        </div>
        <div className="flex gap-4">
          <img
            src={StringIcon}
            className={iconClass}
            query-id="DataStringIcon"
          />
          <img src={MoneyIcon} className={iconClass} query-id="DataMoneyIcon" />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
