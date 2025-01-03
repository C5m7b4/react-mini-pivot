import LabelIcon from './images/LabelIcon.png';
import LineIcon from './images/LineIcon.png';
import StringIcon from './images/StringIcon.png';
import MoneyIcon from './images/MoneyIcon.png';
import {
  DisplayIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignTopIcon,
  AlignBottomIcon,
} from './icons';
import { useAppContext } from './hooks/useAppContext';
import { useEffect } from 'react';
import { MessageProps, ToolSection } from './types';
import { useActiveTool } from './hooks/useActiveTool';

const Toolbar = () => {
  const {
    setMessages,
    messages,
    activeTools,
    setActiveTools,
    reportTools,
    setReportTools,
  } = useAppContext();
  const { activeTool } = useActiveTool();
  // const {activeTools, setActiveTools} = useActiveTools();}
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

  const handleAlignTop = () => {
    const box = activeTool?.box;
    if (box) {
      const container = document.querySelector(
        `[query-id="${activeTool?.toolSection}"]`,
      ) as HTMLDivElement;
      const containerBox = container?.getBoundingClientRect();
      const copy = [...activeTools];
      const offsetTop = box.top - containerBox.top;
      activeTools.forEach((tool) => {
        const toolCopy = { ...tool };
        toolCopy.y = offsetTop;
        let pos = copy.findIndex((t) => t.queryId === toolCopy.queryId);
        copy.splice(pos, 1, toolCopy);
        setActiveTools(copy);

        // now update the ones that we actually see in the dom
        const { panelTools, setPanelTools } = getContainerTools(
          tool.toolSection,
        );
        const visibleCopy = [...panelTools!];
        pos = visibleCopy.findIndex((t) => t.queryId === toolCopy.queryId);
        const panelTool = visibleCopy.find(
          (t) => t.queryId === toolCopy.queryId,
        );
        panelTool!.y = offsetTop;
        visibleCopy.splice(pos, 1, panelTool!);
        setPanelTools!(visibleCopy);
      });
    }
  };

  const handleAlignBottom = () => {
    const box = activeTool?.box;
    if (box) {
      const container = document.querySelector(
        `[query-id="${activeTool?.toolSection}"]`,
      ) as HTMLDivElement;
      const containerBox = container?.getBoundingClientRect();
      const copy = [...activeTools];
      const offsetTop = box.top - containerBox.top;
      activeTools.forEach((tool) => {
        const toolCopy = { ...tool };
        toolCopy.y = offsetTop;
        let pos = copy.findIndex((t) => t.queryId === toolCopy.queryId);
        copy.splice(pos, 1, toolCopy);
        setActiveTools(copy);

        // now update the ones that we actually see in the dom
        const { panelTools, setPanelTools } = getContainerTools(
          tool.toolSection,
        );
        const visibleCopy = [...panelTools!];
        pos = visibleCopy.findIndex((t) => t.queryId === toolCopy.queryId);
        const panelTool = visibleCopy.find(
          (t) => t.queryId === toolCopy.queryId,
        );
        panelTool!.y = offsetTop;
        visibleCopy.splice(pos, 1, panelTool!);
        setPanelTools!(visibleCopy);
      });
    }
  };

  const getContainerTools = (type: ToolSection) => {
    switch (type) {
      case 'report-panel':
        return { panelTools: reportTools, setPanelTools: setReportTools };
      default:
        return {};
    }
  };

  return (
    <div
      query-id="master-toolbar"
      className="w-full border rounded-lg shadow-md p-1 mb-2 flex gap-4"
    >
      <div className="flex gap-4 border rounded-md p-2">
        <img className={iconClass} query-id="LabelIcon" src={LabelIcon} />
        <img className={iconClass} query-id="LineIcon" src={LineIcon} />
      </div>
      <div className="flex gap-4 border rounded-md p-2">
        <AlignLeftIcon height={30} width={30} className="cursor-pointer" />
        <AlignCenterIcon height={30} width={30} className="cursor-pointer" />
        <AlignRightIcon height={30} width={30} className="cursor-pointer" />
      </div>
      <div className="flex gap-4 border rounded-md p-2">
        <AlignTopIcon
          height={30}
          width={30}
          className="cursor-pointer shadow-sm"
          onClick={handleAlignTop}
        />
        <AlignBottomIcon
          height={30}
          width={30}
          className="cursor-pointer"
          onClick={handleAlignBottom}
        />
      </div>
      <div className="flex gap-4 border rounded-md p-2">
        <div onClick={handleClick}>
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
