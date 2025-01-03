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

  const isArray = (arr: any) => {
    if (Array.isArray(arr)) {
      return ' - (' + arr.length.toString() + ')';
    }
    return '';
  };

  const isFunction = (func: any) => {
    return func && {}.toString.call(func) === '[object Function]';
  };

  const isObject = (obj: any) => {
    if (typeof obj === 'object' && obj !== null) {
      return '{}';
    } else {
      return '';
    }
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
          {!isFunction(value) ? (
            <>
              <span className="font-semibold">
                {nodeKey}
                {isArray(value) ? isArray(value) : isObject(value)}:
              </span>
              {!isExpandable && (
                <span className="ml-2 text-gray-600">{String(value)}</span>
              )}
            </>
          ) : null}
        </div>
        {expanded && isExpandable && renderTree(value, keyPath)}
      </div>
    );
  };

  return <div className="p-4 bg-gray-100 rounded">{renderTree(data)}</div>;
};

export default JsonTreeView;
