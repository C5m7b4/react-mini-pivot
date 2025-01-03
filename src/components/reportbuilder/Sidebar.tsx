import { getIconComponent } from './utils';

interface SidebarProps<T> {
  data: T[];
}

type iToolType = 'Label' | 'Line';

interface iTools {
  name: iToolType;
}

const tools: iTools[] = [
  {
    name: 'Label',
  },
  {
    name: 'Line',
  },
];

const Sidebar = <T,>({ data }: SidebarProps<T>) => {
  const firstRecord = data[0];

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    v: string,
    icon: string,
    queryId: string,
  ) => {
    e.dataTransfer.setData('fieldType', v);
    e.dataTransfer.setData(queryId, '');
    e.dataTransfer.effectAllowed = 'copyMove';
    e.dataTransfer.dropEffect = 'move';

    e.dataTransfer.setDragImage(
      document.querySelector(`[query-id="${icon}"]`) as HTMLImageElement,
      0,
      0,
    );
  };

  const toolClassName =
    'pl-2 pr-4 py-2 text-left hover:bg-gray-100 transition-all duration-500 cursor-pointer transition-all duration-500';
  return (
    <div className="w-full">
      <div className="text-xl font-medium border-b">Sidebar</div>
      <div>
        <div className="text-lg font-medium border-b mt-4">Tools</div>
        {tools.map((tool, tidx) => {
          return (
            <div key={`tool-${tidx}`}>
              <div
                query-id={`report-${tool.name}-${tidx}`}
                draggable
                onDragStart={(e) =>
                  handleDragStart(e, tool.name, `${tool.name}Icon`, `all`)
                }
                className={toolClassName}
              >
                {tool.name}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <div className="text-lg font-medium border-b mt-4">Fields</div>
        <div>
          {Object.keys(firstRecord as object).map((key, idx) => {
            const IconComponent = getIconComponent(data, key as keyof T);
            return (
              <div key={`sidebar-${idx}`}>
                <div
                  query-id={`data-${key}-${idx}`}
                  draggable
                  className={`${toolClassName} flex gap-4`}
                  onDragStart={(e) =>
                    handleDragStart(e, key, 'DataStringIcon', `reports`)
                  }
                >
                  <div>
                    <IconComponent height={20} width={20} />
                  </div>
                  <div className="flex place-items-center justify-center-items-center">
                    {key}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
