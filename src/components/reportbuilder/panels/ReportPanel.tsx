import { useRef, useEffect } from 'react';
import DataTool from '../tools/DataTool';
import { checkOverlap } from '../utils';
import { useAppContext } from '../hooks/useAppContext';
import { generateId } from '../../../utils/id';
import { ToolProps } from '../types';

interface ReportPanelProps<T> {
  data: T[];
}

const ReportPanel = <T,>({ data }: ReportPanelProps<T>) => {
  const context = useAppContext();
  const { liveMode, reportTools, setReportTools, setActiveTool } =
    useAppContext();
  const ref = useRef<HTMLDivElement>(null);
  const contextRef = useRef(context);

  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('mousedown', handleMouseDown);
      ref.current.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('mousedown', handleMouseDown);
        ref.current.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);

  useEffect(() => {}, [reportTools]);

  const handleMouseDown = () => {
    // check here to see if we are clicking on the blank canvas or on an item

    let toolClicked = false;
    if (isToolClicked(contextRef.current.activeTool?.queryId)) {
      toolClicked = true;
    }
    contextRef.current.activeTools.forEach((tool) => {
      if (isToolClicked(tool.queryId)) {
        toolClicked = true;
      }
    });
    if (!toolClicked) {
      // @ts-expect-error we need this to be null
      setActiveTool(null);
    }
  };

  const isToolClicked = (queryId: string) => {
    const toolDiv = document.querySelector(
      `[query-id="${queryId}"]`,
    ) as HTMLDivElement;
    if (ref.current) {
      if (ref.current.contains(toolDiv)) {
        return true;
      }
    }
    return false;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'Delete':
        if (
          contextRef.current.activeTool &&
          contextRef.current.activeTool.queryId
        ) {
          const newTools = contextRef.current.reportTools.filter(
            (tool) => tool.queryId !== contextRef.current.activeTool.queryId,
          );
          setReportTools(newTools);
        }
        break;
      default:
        break;
    }
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const div = e.target as HTMLDivElement;
    const isInDropZone = checkOverlap(
      div,
      document.querySelector('[query-id="canvas"]') as HTMLDivElement,
    );
    if (!isInDropZone) {
      const currentTransform = { x: 0, y: 0 };
      div.style.transform = `translate(${currentTransform.x}px, ${currentTransform.y}px)`;
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const fieldType = e.dataTransfer.getData('fieldType');

    if (ref.current) {
      const box = ref.current.getBoundingClientRect();
      const obj: ToolProps = {
        fieldType: fieldType,
        x: e.clientX - box.left,
        y: e.clientY - box.top,
        queryId: 'tool-' + generateId(),
        text: fieldType,
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontVariant: 'normal',
        textDecoration: 'none',
        fontSize: 16,
        width: 200,
        height: 24,
        lineHeight: 16,
        textAlign: 'left',
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingTop: 0,
        toolSection: 'report-panel',
      };

      setReportTools([...reportTools, obj]);
      setActiveTool(obj);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.target as HTMLDivElement).style.border = '0px solid black';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    const type = e.dataTransfer.types[0];
    if (liveMode) {
      return;
    }
    if (type === 'report-panel') {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const calculateHeight = () => {
    if (ref.current) {
      const box = ref.current.getBoundingClientRect();
      return box.height;
    }
    return 0;
  };

  return (
    <div
      tabIndex={0}
      ref={ref}
      className="w-full h-full"
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      query-id="report-panel"
    >
      {liveMode ? (
        <div
          className={`overflow-y-scroll overflow-x-hidden pt-2 pb-2`}
          style={{ height: calculateHeight(), maxHeight: calculateHeight() }}
        >
          {data.map((d, didx) => {
            return (
              <div
                key={`r-d-${didx}`}
                className={`grid grid-cols-${reportTools.length}`}
              >
                {reportTools.map((tool, tidx) => {
                  return (
                    <div
                      // className="absolute"
                      key={`r-d-t-${tidx}`}
                      style={{
                        left: `${tool.x}px`,
                        top: `${didx * tool.lineHeight}px`,
                      }}
                    >
                      {d[tool.fieldType]}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          {reportTools.map((tool, idx) => {
            console.log('tool top', tool.y);
            return (
              <div key={`tool-${idx}`}>
                <DataTool
                  x={tool.x}
                  y={tool.y}
                  fieldType={tool.fieldType}
                  text={tool.text}
                  queryId={tool.queryId}
                  fontWeight={tool.fontWeight}
                  fontSize={tool.fontSize}
                  fontStyle={tool.fontStyle}
                  fontVariant={tool.fontVariant}
                  height={tool.height}
                  width={tool.width}
                  textAlign={tool.textAlign}
                  lineHeight={tool.lineHeight}
                  paddingLeft={tool.paddingLeft}
                  paddingRight={tool.paddingRight}
                  paddingTop={tool.paddingTop}
                  paddingBottom={tool.paddingBottom}
                  textDecoration={tool.textDecoration}
                  toolSection={tool.toolSection}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReportPanel;
