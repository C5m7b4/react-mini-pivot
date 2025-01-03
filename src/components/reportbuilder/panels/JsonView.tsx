import React, { useState } from 'react';

type JsonTreeViewProps = {
  data: Record<string, any>;
};

const JsonTreeView: React.FC<JsonTreeViewProps> = ({ data }) => {
  const renderTree = (node: any, keyPath: string = '') => {
    if (typeof node === 'object' && node !== null) {
      return (
        <div className="ml-4 border-l pl-4">
          {Object.entries(node).map(([key, value]) => (
            <TreeNode
              key={keyPath + key}
              nodeKey={key}
              value={value}
              keyPath={keyPath + key}
            />
          ))}
        </div>
      );
    }
    return <span className="text-gray-600"> {String(node)}</span>;
  };

  const TreeNode: React.FC<{
    nodeKey: string;
    value: any;
    keyPath: string;
  }> = ({ nodeKey, value, keyPath }) => {
    const [expanded, setExpanded] = useState(false);
    const isExpandable = typeof value === 'object' && value !== null;

    return (
      <div className="flex flex-col space-y-1">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => isExpandable && setExpanded((prev) => !prev)}
        >
          {isExpandable && (
            <span
              className={`mr-2 transition-transform ${
                expanded ? 'rotate-90' : ''
              }`}
            >
              ▶
            </span>
          )}
          <span className="font-semibold">{nodeKey}:</span>
          {!isExpandable && (
            <span className="ml-2 text-gray-600">{String(value)}</span>
          )}
        </div>
        {expanded && isExpandable && renderTree(value, keyPath)}
      </div>
    );
  };

  return <div className="p-4 bg-gray-100 rounded">{renderTree(data)}</div>;
};

export default JsonTreeView;

// import { useState } from 'react';
// import { AppContextType } from '../AppProvider';

// interface TreeNodeProps {
//   data: AppContextType;
//   name?: string;
// }

// const TreeNode = ({ data, name }: TreeNodeProps) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const toggleNode = () => {
//     setIsExpanded(!isExpanded);
//   };

//   const isObject = (value: any) => typeof value === 'object' && value !== null;

//   return (
//     <div>
//       <span
//         onClick={toggleNode}
//         style={{
//           cursor: 'pointer',
//           fontWeight: isObject(data) ? 'bold' : 'normal',
//         }}
//       >
//         {isObject(data) ? (isExpanded ? '▼' : '▶') : null} {name || 'root'}
//       </span>
//       {isExpanded &&
//         isObject(data) &&
//         Object.entries(data).map(([key, value]) => (
//           <TreeNode key={key} data={value} name={key} />
//         ))}
//     </div>
//   );
// };

// interface JsonViewerProps {
//   data: AppContextType;
// }

// const JsonViewer = ({ data }: JsonViewerProps) => {
//   return (
//     <div className="border rounded-md shadow-md mt-2 p-2">
//       <TreeNode data={data} />
//     </div>
//   );
// };

// export default JsonViewer;
