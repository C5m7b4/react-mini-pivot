import { useState, useEffect } from 'react';
import { Column, Row, ValueType } from '../../../types';

export interface FieldsProps<T> {
  data: T[];
  rows: Row<T>[];
  values: ValueType<T>[];
  query?: string;
  columns: Column<T>[];
}

const Fields = <T,>({
  data,
  rows,
  values,
  query = '',
  columns,
}: FieldsProps<T>) => {
  const [usedFields, setUsedFields] = useState<(keyof T)[] | undefined>([]);

  useEffect(() => {
    const valueFields = values.map((v) => v.label);
    const rowFields = rows.map((r) => r.label);
    const columnFields = columns.map((c) => c.label);
    setUsedFields([...rowFields, ...valueFields, ...columnFields]);
  }, [rows, values, columns]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    fieldType: keyof T,
  ) => {
    e.dataTransfer.setData('fieldType', fieldType as string);
    e.dataTransfer.effectAllowed = 'copyMove';
  };

  const handleCheck = () => {};

  const firstRecord: T = data[0];

  const hasBorder = (r: keyof T) => {
    return usedFields!.includes(r)
      ? 'border border-1 border-blue-400 rounded-lg'
      : '';
  };

  return (
    <div data-testid="fields" className="border rounded-lg shadow-md p-2">
      {Object.keys(firstRecord as object).map((r, i) => {
        if (query.length > 0) {
          if (r.includes(query.toLowerCase())) {
            return (
              <div
                className={`cursor-pointer mb-1 ${hasBorder(r as keyof T)}`}
                key={`field-${i}`}
                // style={{ border: hasBorder(r as keyof T) }}
                draggable
                onDragStart={(e) => handleDragStart(e, r as keyof T)}
              >
                <input
                  type="checkbox"
                  className="mr-2 ml-2"
                  checked={usedFields!.includes(r as keyof T) ? true : false}
                  onChange={handleCheck}
                />
                <label className="cursor-pointer">{r}</label>
              </div>
            );
          }
        } else {
          return (
            <div
              query-id={`query-field-${i}`}
              data-testid={`field-${i}`}
              className={`cursor-pointer mb-1 ${hasBorder(r as keyof T)}`}
              key={`field-${i}`}
              // style={{ border: hasBorder(r as keyof T) }}
              draggable
              onDragStart={(e) => handleDragStart(e, r as keyof T)}
            >
              <input
                type="checkbox"
                className="mr-2 ml-2"
                checked={usedFields!.includes(r as keyof T) ? true : false}
                onChange={handleCheck}
              />
              <label className="cursor-pointer">{r}</label>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Fields;
