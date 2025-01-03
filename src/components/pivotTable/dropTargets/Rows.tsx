import { Column, FilterType, Row, ValueType } from '../../../types';
import { doesRowExist } from '../../../utils/arrayUtils';
import { getDragAfterElement } from '../../../utils/dragUtils';
import { ChevronDown } from '../Icons';
import { useClickOutside } from '../hooks/useClickOutside';
import { useEffect, useState } from 'react';

export interface RowProps<T> {
  rows: Row<T>[];
  setRows: (rows: Row<T>[]) => void;
  filters: FilterType<T>[];
  setFilters: (filters: FilterType<T>[]) => void;
  columns: Column<T>[];
  setColumns: (columns: Column<T>[]) => void;
  values: ValueType<T>[];
  setValues: (values: ValueType<T>[]) => void;
}

const Rows = <T,>({
  rows,
  setRows,
  filters,
  setFilters,
  columns,
  setColumns,
  values,
  setValues,
}: RowProps<T>) => {
  const [currentRow, setCurrentRow] = useState<Row<T>>();
  const ref = useClickOutside<HTMLDivElement>(() => {
    if (ref.current) {
      ref.current.setAttribute('data-display', 'closed');
    }
  });

  useEffect(() => {}, [rows]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    (e.target as HTMLDivElement).classList.remove('dragging');
    const fieldType = e.dataTransfer.getData('fieldType');
    const newRow: Row<T> = {
      label: fieldType as keyof T,
      direction: 'asc',
    };

    const isExisting = doesRowExist(rows, 'label', fieldType);

    if (isExisting.found) {
      const copy = rows.filter((r) => r.label != fieldType);
      const container = document.querySelector('[query-id="filtered-rows"]');
      const afterElement = getDragAfterElement(
        container as HTMLDivElement,
        e.clientY,
      );

      if (afterElement) {
        const pos = rows.findIndex((r) => (r.label = afterElement.innerHTML));
        copy.splice(pos, 0, newRow);

        setRows(copy);
      }
    } else {
      const newRows = [...rows, newRow];

      setRows(newRows);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.target as HTMLDivElement).style.border = '2px solid #00000';
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    fieldType: Row<T>,
  ) => {
    e.dataTransfer.setData('fieldType', String(fieldType.label));
    (e.target as HTMLDivElement).style.border = '1px solid #000';
    (e.target as HTMLDivElement).style.opacity = '0.8';
    (e.target as HTMLDivElement).classList.add('dragging');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    // @ts-expect-error cannot use null for border
    (e.target as HTMLDivElement).style.border = null;
  };

  const handleShowOptions = (
    e: React.MouseEvent<HTMLSpanElement>,
    row: Row<T>,
  ) => {
    const div = document.querySelector(
      `[query-id="query-${row.label.toString()}"]`,
    );
    setCurrentRow(row);

    const rect = div!.getBoundingClientRect();
    if (ref.current && div) {
      const configurator = document.querySelector('[query-id="configurator"]');
      const configBox = configurator?.getBoundingClientRect();

      ref.current.style.top = `${rect.top - configBox!.top - 240}px`;
      ref.current.style.left = `${rect.left - configBox!.left}px`;

      ref.current.setAttribute('data-display', 'open');
    }
  };

  const handleRemove = () => {
    if (ref.current && currentRow) {
      const copy = rows.filter((r) => r.label != currentRow.label);
      ref.current.setAttribute('data-display', 'closed');
      setRows(copy);
      ref.current.setAttribute('data-display', 'closed');
    }
  };

  const handleMoveUp = () => {
    if (rows.length > 1 && !isFirst()) {
      if (ref.current && currentRow) {
        const copy = [...rows];
        const pos = copy.findIndex((r) => r.label === currentRow.label);
        copy.splice(pos, 1);
        copy.splice(pos - 1, 0, currentRow);
        setRows(copy);
        ref.current.setAttribute('data-display', 'closed');
      }
    }
  };

  const handleMoveDown = () => {
    if (rows.length > 1 && !isLast()) {
      if (ref.current && currentRow) {
        const copy = [...rows];
        const pos = copy.findIndex((r) => r.label === currentRow.label);
        copy.splice(pos, 1);
        copy.splice(pos + 1, 0, currentRow);
        setRows(copy);
        ref.current.setAttribute('data-display', 'closed');
      }
    }
  };

  const handleMoveToBeginning = () => {
    if (rows.length > 1 && !isFirst()) {
      if (ref.current && currentRow) {
        const pos = rows.findIndex((r) => r.label === currentRow.label);
        const copy = [...rows];
        copy.splice(pos, 1);
        copy.unshift(currentRow);
        setRows(copy);
        ref.current.setAttribute('data-display', 'closed');
      }
    }
  };

  const handleMoveToEnd = () => {
    if (rows.length > 1 && !isLast()) {
      if (ref.current && currentRow) {
        const copy = [...rows];
        const pos = rows.findIndex((r) => r.label === currentRow.label);
        copy.splice(pos, 1);
        copy.push(currentRow);
        setRows(copy);
        ref.current.setAttribute('data-display', 'closed');
      }
    }
  };

  const isFirst = () => {
    if (currentRow) {
      const pos = rows.findIndex((r) => r.label === currentRow.label);
      return pos === 0 ? true : false;
    }
    return false;
  };

  const isLast = () => {
    if (currentRow) {
      const pos = rows.findIndex((r) => r.label === currentRow.label);
      return pos === rows.length - 1 ? true : false;
    }
    return false;
  };

  const moveToFilters = () => {
    if (ref.current && currentRow) {
      const copy = [...rows];
      const pos = rows.findIndex((r) => r.label === currentRow.label);
      copy.splice(pos, 1);
      setRows(copy);

      const newFilter: FilterType<T> = {
        label: currentRow.label,
      };
      setFilters([...filters, newFilter]);
      ref.current.setAttribute('data-display', 'closed');
    }
  };

  const moveToValues = () => {
    if (ref.current && currentRow) {
      const copy = [...rows];
      const pos = rows.findIndex((r) => r.label === currentRow.label);
      copy.splice(pos, 1);
      setRows(copy);
      const newValue: ValueType<T> = {
        label: currentRow.label,
        direction: currentRow.direction,
        aggregator: 'SUM',
      };
      setValues([...values, newValue]);

      ref.current.setAttribute('data-display', 'closed');
    }
  };

  const moveToColumns = () => {
    if (ref.current && currentRow) {
      const copy = [...rows];
      const pos = rows.findIndex((r) => r.label === currentRow.label);
      copy.splice(pos, 1);
      setRows(copy);
      const newColumn: Column<T> = {
        label: currentRow.label,
        direction: currentRow.direction,
        inclusions: [],
      };
      setColumns([...columns, newColumn]);

      ref.current.setAttribute('data-display', 'closed');
    }
  };

  return (
    <div>
      <div className="font-medium">Rows</div>
      <div
        data-testid="filtered-rows"
        query-id="filtered-rows"
        className="relative border rounded-md shadow-md p-1 min-h-[150px] max-h-[200px] overflow-y-auto"
        id="filtered-rows"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        {rows.map((r, i) => (
          <div
            query-id={`query-${r.label.toString()}`}
            draggable
            onDragStart={(e) => handleDragStart(e, r)}
            onDragLeave={(e) => handleDragLeave(e)}
            key={`row-${i}`}
            onClick={(e) => handleShowOptions(e, r)}
            className="flex justify-between draggable-item border rounded-md shadow-sm px-2 mb-1 cursor-pointer"
          >
            <span>{String(r.label)}</span>
            <span className="flex justify-center items-center">
              <ChevronDown height={10} width={10} stroke="#000" />
            </span>
          </div>
        ))}
      </div>
      <div
        ref={ref}
        data-display="closed"
        query-id="rows-context-menu"
        className="bg-white absolute data-[display=closed]:animate-dissapear data-[display=open]:animate-appear
        border rounded-lg shadow-md px-2 py-1 opacity-100"
      >
        <div
          query-id="rows-move-up"
          onClick={handleMoveUp}
          className={`${rows.length > 1 && !isFirst() ? 'hover:bg-slate-100 cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
        >
          Move Up
        </div>
        <div
          query-id="rows-move-down"
          onClick={handleMoveDown}
          className={`${rows.length > 1 && !isLast() ? 'hover:bg-slate-100 cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
        >
          Move Down
        </div>
        <div
          query-id="rows-move-to-beginning"
          onClick={handleMoveToBeginning}
          className={`${rows.length > 1 && !isFirst() ? 'hover:bg-slate-100 cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
        >
          Move to Beginning
        </div>
        <div
          query-id="rows-move-to-end"
          onClick={handleMoveToEnd}
          className={`${rows.length > 1 && !isLast() ? 'hover:bg-slate-100 cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
        >
          Move to End
        </div>
        <div>
          <hr />
        </div>
        <div
          query-id="rows-move-to-filters"
          onClick={moveToFilters}
          className="cursor-pointer hover:bg-slate-100"
        >
          Move to Filters
        </div>
        <div
          query-id="rows-move-to-columns"
          onClick={moveToColumns}
          className="cursor-pointer hover:bg-slate-100"
        >
          Move to Columns
        </div>
        <div
          query-id="rows-move-to-values"
          onClick={moveToValues}
          className="cursor-pointer hover:bg-slate-100"
        >
          Move to Values
        </div>
        <div>
          <hr />
        </div>
        <div
          query-id="rows-remove"
          onClick={handleRemove}
          className="cursor-pointer hover:bg-slate-100"
        >
          Remove Field
        </div>
        <div className="cursor-pointer hover:bg-slate-100">Field Settings</div>
      </div>
    </div>
  );
};

export default Rows;
