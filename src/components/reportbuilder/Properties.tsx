import JsonTreeView from './panels/JsonView';
import { useAppContext } from './hooks/useAppContext';
import { useActiveTool } from './hooks/useActiveTool';
import { useEffect } from 'react';
import Tooltip from '../tooltip/Tooltip';

const propertyDivClassName = 'px-2 py-1 grid grid-cols-2 gap-2';
const propertyNameClassName = 'font-medium border-r border-b p-1 text-left';
const propertyValueClassName = 'p-1 text-right border-b';

interface PropertiesProps<T> {
  data: T[];
}

const Properties = <T,>({ data }: PropertiesProps<T>) => {
  const { setActiveTool, reportTools, setReportTools } = useAppContext();
  const { activeTool } = useActiveTool();
  const context = useAppContext();

  useEffect(() => {}, []);

  const updateTool = (key: string, value: string) => {
    if (activeTool) {
      const updatedTool = { ...activeTool, [key]: value };
      setActiveTool(updatedTool);
      if (activeTool.toolSection === 'reports') {
        const copy = [...reportTools];
        const pos = copy.findIndex((t) => t.queryId === activeTool.queryId);
        copy.splice(pos, 1, updatedTool);
        setReportTools(copy);
      } else if (activeTool.toolSection === 'header') {
      } else if (activeTool.toolSection === 'footer') {
      }
    }
  };

  const calculateHeight = () => {
    const toolbar = document.querySelector('[query-id="master-toolbar"]');
    const box = toolbar?.getBoundingClientRect();
    if (box) {
      const remaining = window.innerHeight - (box.top! + box.height!) - 50;
      return remaining;
    }
    return 0;
  };

  const firstRecord = data[0];

  return (
    <div
      className="border rounded-md shadow-md p-2 overflow-y-scroll overflow-x-hidden"
      style={{ height: `${calculateHeight()}px` }}
    >
      <div className="border-b font-xl font-medium ">Properties</div>
      <div>
        {activeTool ? (
          <div className="border rounded-md shadow-md mt-2">
            <div className="border-b px-4 bg-slate-200 font-medium">
              Active Tool - {activeTool.fieldType}
            </div>
            {activeTool.fieldType === 'label' ? (
              <div className={propertyDivClassName}>
                <div className={propertyNameClassName}>Text:</div>
                <div className={propertyValueClassName}>
                  <input
                    type="text"
                    className="text-right pr-2"
                    value={activeTool.text}
                    onChange={(e) => updateTool('text', e.target.value)}
                  />
                </div>
              </div>
            ) : null}
            {activeTool.fieldType != 'label' &&
            activeTool.fieldType != 'line' ? (
              <div className={propertyDivClassName}>
                <div className={propertyNameClassName}>Data Index:</div>
                <div className={propertyValueClassName}>
                  <select
                    value={activeTool.fieldType}
                    className="text-right pr-2"
                    onChange={(e) => updateTool('fieldType', e.target.value)}
                  >
                    {Object.keys(firstRecord as object).map((key, idx) => (
                      <option key={`data-index-${idx}`} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : null}

            <div className={propertyDivClassName}>
              <div className={propertyNameClassName}>Query ID:</div>

              <Tooltip content={activeTool.queryId} position="bottom">
                <div
                  className={`${propertyValueClassName} truncate text-ellipsis text-right`}
                  style={{ maxWidth: '170px' }}
                >
                  {activeTool.queryId}
                </div>
              </Tooltip>
            </div>
            <div className={propertyDivClassName}>
              <div className={propertyNameClassName}>Width:</div>
              <div className={propertyValueClassName}>
                <input
                  type="number"
                  className="text-right pr-2"
                  value={activeTool.width}
                  onChange={(e) => updateTool('width', e.target.value)}
                />
              </div>
            </div>
            <div className={propertyDivClassName}>
              <div className={propertyNameClassName}>Height:</div>
              <div className={propertyValueClassName}>
                <input
                  type="number"
                  className="text-right pr-2"
                  value={activeTool.height}
                  onChange={(e) => updateTool('height', e.target.value)}
                />
              </div>
            </div>
            <div className={propertyDivClassName}>
              <div className={propertyNameClassName}>Top:</div>
              <div className={propertyValueClassName}>
                <input
                  type="number"
                  className="text-right pr-2"
                  value={activeTool.y}
                  onChange={(e) => updateTool('y', e.target.value)}
                />
              </div>
            </div>
            <div className={propertyDivClassName}>
              <div className={propertyNameClassName}>Left:</div>
              <div className={propertyValueClassName}>
                <input
                  type="number"
                  className="text-right pr-2"
                  value={activeTool.x}
                  onChange={(e) => updateTool('x', e.target.value)}
                />
              </div>
            </div>
            <div className={propertyDivClassName}>
              <div className={propertyNameClassName}>Text Align</div>
              <div className={`${propertyValueClassName} select-none`}>
                <select
                  className="text-right pr-2"
                  value={activeTool.textAlign}
                  onChange={(e) => updateTool('textAlign', e.target.value)}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>
            <div className={propertyDivClassName}>
              <div className={propertyNameClassName}>Font Size</div>
              <div className={`${propertyValueClassName} select-none`}>
                <select
                  value={activeTool.fontSize}
                  className="text-right pr-2"
                  onChange={(e) => updateTool('fontSize', e.target.value)}
                >
                  <option value="16">16px</option>
                  <option value="18">18px</option>
                  <option value="20">20px</option>
                  <option value="22">22px</option>
                  <option value="24">24px</option>
                  <option value="26">26px</option>
                  <option value="28">28px</option>
                  <option value="30">30px</option>
                </select>
              </div>
            </div>
            <div className={propertyDivClassName}>
              <div className={propertyNameClassName}>Font Weight</div>
              <div className={`${propertyValueClassName} select-none`}>
                <select
                  value={activeTool.fontWeight}
                  className="text-right pr-2"
                  onChange={(e) => updateTool('fontWeight', e.target.value)}
                >
                  <option value="normal">Regular</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
            </div>
            <div className={propertyDivClassName}>
              <div className={propertyNameClassName}>Font Style</div>
              <div className={`${propertyValueClassName} select-none`}>
                <select
                  value={activeTool.fontStyle}
                  className="text-right pr-2"
                  onChange={(e) => updateTool('fontStyle', e.target.value)}
                >
                  <option value="normal">Normal</option>
                  <option value="italic">Italic</option>
                  <option value="oblique">Oblique</option>
                  <option value="initial">Initial</option>
                  <option value="inherit">Inherit</option>
                </select>
              </div>
            </div>
            <div className={propertyDivClassName}>
              <div className={propertyNameClassName}>Font Variant</div>
              <div className={`${propertyValueClassName} select-none`}>
                <select
                  value={activeTool.fontVariant}
                  className="text-right pr-2"
                  onChange={(e) => updateTool('fontVariant', e.target.value)}
                >
                  <option value="normal">Normal</option>
                  <option value="small-caps">Small Caps</option>
                </select>
              </div>
            </div>
            <div className={propertyDivClassName}>
              <div className={propertyNameClassName}>Text Decoration</div>
              <div className={`${propertyValueClassName} select-none`}>
                <select
                  value={activeTool.textDecoration}
                  className="text-right pr-2"
                  onChange={(e) => updateTool('textDecoration', e.target.value)}
                >
                  <option value="none">None</option>
                  <option value="overline">Overline</option>
                  <option value="line-through">Line-through</option>
                  <option value="underline">Underline</option>
                  <option value="underline overline">Underline Overline</option>
                </select>
              </div>
            </div>
            <div className={propertyDivClassName}>
              <div className={propertyNameClassName}>Padding Left</div>
              <div className={`${propertyValueClassName} select-none`}>
                <select
                  value={activeTool.paddingLeft}
                  className="text-right pr-2"
                  onChange={(e) => updateTool('paddingLeft', e.target.value)}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="3">2</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                </select>
              </div>
            </div>
            <div className={propertyDivClassName}>
              <div className={propertyNameClassName}>Padding Right</div>
              <div className={`${propertyValueClassName} select-none`}>
                <select
                  value={activeTool.paddingRight}
                  className="text-right pr-2"
                  onChange={(e) => updateTool('paddingRight', e.target.value)}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="3">2</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                </select>
              </div>
            </div>
            <div className={propertyDivClassName}>
              <div className={propertyNameClassName}>Padding Top</div>
              <div className={`${propertyValueClassName} select-none`}>
                <select
                  value={activeTool.paddingTop}
                  className="text-right pr-2"
                  onChange={(e) => updateTool('paddingTop', e.target.value)}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="3">2</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                </select>
              </div>
            </div>
            <div className={propertyDivClassName}>
              <div className={propertyNameClassName}>Padding Bottom</div>
              <div className={`${propertyValueClassName} select-none`}>
                <select
                  value={activeTool.paddingBottom}
                  className="text-right pr-2"
                  onChange={(e) => updateTool('paddingBottom', e.target.value)}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="3">2</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                </select>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <JsonTreeView data={context} />
    </div>
  );
};

export default Properties;
