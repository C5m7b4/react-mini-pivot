import {
  render,
  act,
  screen,
  fireEvent,
  createEvent,
} from '@testing-library/react';
import Configurator from '../../../../src/components/pivotTable/Configurator';
import { describe, expect, it, vi } from 'vitest';
import { data, iData } from '../../../../example/data';
import '@testing-library/jest-dom';
import { useState } from 'react';
import { Column, FilterType, Row, ValueType } from '../../../../src/types';
import Rows from '../../../../src/components/pivotTable/dropTargets/Rows';
import { queryByQueryId } from '../query';

const testRow: Row<iData> = {
  label: 'company',
  direction: 'asc',
};

describe('Rows', () => {
  it('should render', async () => {
    const Wrapper = () => {
      const [rows, setRows] = useState<Row<iData>[]>([]);
      return (
        <Configurator
          data={data}
          rows={rows}
          setRows={setRows}
          values={[]}
          setValues={vi.fn()}
          filters={[]}
          setFilters={vi.fn()}
          columns={[]}
          setColumns={vi.fn()}
        />
      );
    };

    render(<Wrapper />);

    const field = screen.getByTestId('field-5');
    const rows = screen.getByTestId('filtered-rows');
    const dragStartEvent = createEvent.dragStart(field);
    const dragOverEvent = createEvent.dragOver(rows);
    const dropEvent = createEvent.drop(rows);
    Object.defineProperty(dragStartEvent, 'dataTransfer', {
      value: {
        setData: vi.fn(),
      },
    });
    Object.defineProperty(dragOverEvent, 'dataTransfer', {
      value: { dropEffect: 'move' },
    });
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: { getData: vi.fn(() => 'company') },
    });

    await act(async () => {
      fireEvent(field, dragStartEvent);
      fireEvent(rows, dragOverEvent);
      fireEvent(rows, dropEvent);
    });
    expect(rows.children.length).toEqual(1);
    expect(rows.textContent).toContain('company');
  });
  it('should not have a move if its the only item', async () => {
    const Wrapper = () => {
      const [rows, setRows] = useState<Row<iData>[]>([testRow]);
      const [columns, setColumns] = useState<Column<iData>[]>([]);
      const [filters, setFilters] = useState<FilterType<iData>[]>([]);
      const [values, setValues] = useState<ValueType<iData>[]>([]);

      return (
        <Configurator
          data={data}
          rows={rows}
          setRows={setRows}
          columns={columns}
          setColumns={setColumns}
          filters={filters}
          setFilters={setFilters}
          values={values}
          setValues={setValues}
        />
      );
    };

    render(<Wrapper />);

    const trigger = queryByQueryId(document.body, 'query-company');
    await fireEvent.click(trigger!);

    const moveUp = queryByQueryId(document.body, 'rows-move-up');
    const moveDown = queryByQueryId(document.body, 'rows-move-down');
    const moveToBeginning = queryByQueryId(
      document.body,
      'rows-move-to-beginning',
    );
    const moveToEnd = queryByQueryId(document.body, 'rows-move-to-end');

    expect(moveUp!.classList.contains('cursor-not-allowed')).toBeTruthy();
    expect(moveDown!.classList.contains('cursor-not-allowed')).toBeTruthy();
    expect(
      moveToBeginning!.classList.contains('cursor-not-allowed'),
    ).toBeTruthy();
    expect(moveToEnd!.classList.contains('cursor-not-allowed')).toBeTruthy();
  });
  it('should handle move up', async () => {
    const Wrapper = () => {
      const [rows, setRows] = useState<Row<iData>[]>([
        {
          label: 'company',
          direction: 'asc',
        },
        {
          label: 'cookieType',
          direction: 'asc',
        },
      ]);
      const [columns, setColumns] = useState<Column<iData>[]>([]);
      const [filters, setFilters] = useState<FilterType<iData>[]>([]);
      const [values, setValues] = useState<ValueType<iData>[]>([]);

      return (
        <Configurator
          data={data}
          rows={rows}
          setRows={setRows}
          columns={columns}
          setColumns={setColumns}
          filters={filters}
          setFilters={setFilters}
          values={values}
          setValues={setValues}
        />
      );
    };

    render(<Wrapper />);

    const trigger = queryByQueryId(document.body, 'query-company');
    await fireEvent.click(trigger!);

    const moveDown = queryByQueryId(document.body, 'rows-move-down');
    await fireEvent.click(moveDown!);

    // the rows should be reordered
    const rows = queryByQueryId(document.body, 'filtered-rows');
    expect(rows!.children[0].textContent).toContain('cookieType');
    expect(rows!.children[1].textContent).toContain('company');
  });
  it('should handle move to end', async () => {
    const Wrapper = () => {
      const [rows, setRows] = useState<Row<iData>[]>([
        {
          label: 'company',
          direction: 'asc',
        },
        {
          label: 'cookieType',
          direction: 'asc',
        },
      ]);
      const [columns, setColumns] = useState<Column<iData>[]>([]);
      const [filters, setFilters] = useState<FilterType<iData>[]>([]);
      const [values, setValues] = useState<ValueType<iData>[]>([]);

      return (
        <Configurator
          data={data}
          rows={rows}
          setRows={setRows}
          columns={columns}
          setColumns={setColumns}
          filters={filters}
          setFilters={setFilters}
          values={values}
          setValues={setValues}
        />
      );
    };

    render(<Wrapper />);

    const trigger = queryByQueryId(document.body, 'query-company');
    await fireEvent.click(trigger!);

    const moveDown = queryByQueryId(document.body, 'rows-move-to-end');
    await fireEvent.click(moveDown!);

    // the rows should be reordered
    const rows = queryByQueryId(document.body, 'filtered-rows');
    expect(rows!.children[0].textContent).toContain('cookieType');
    expect(rows!.children[1].textContent).toContain('company');
  });
  it('should handle move up', async () => {
    const Wrapper = () => {
      const [rows, setRows] = useState<Row<iData>[]>([
        {
          label: 'company',
          direction: 'asc',
        },
        {
          label: 'cookieType',
          direction: 'asc',
        },
      ]);
      const [columns, setColumns] = useState<Column<iData>[]>([]);
      const [filters, setFilters] = useState<FilterType<iData>[]>([]);
      const [values, setValues] = useState<ValueType<iData>[]>([]);

      return (
        <Configurator
          data={data}
          rows={rows}
          setRows={setRows}
          columns={columns}
          setColumns={setColumns}
          filters={filters}
          setFilters={setFilters}
          values={values}
          setValues={setValues}
        />
      );
    };

    render(<Wrapper />);

    const trigger = queryByQueryId(document.body, 'query-cookieType');
    await fireEvent.click(trigger!);

    const moveDown = queryByQueryId(document.body, 'rows-move-up');
    await fireEvent.click(moveDown!);

    // the rows should be reordered
    const rows = queryByQueryId(document.body, 'filtered-rows');
    expect(rows!.children[0].textContent).toContain('cookieType');
    expect(rows!.children[1].textContent).toContain('company');
  });
  it('should handle move to beginning', async () => {
    const Wrapper = () => {
      const [rows, setRows] = useState<Row<iData>[]>([
        {
          label: 'company',
          direction: 'asc',
        },
        {
          label: 'cookieType',
          direction: 'asc',
        },
      ]);
      const [columns, setColumns] = useState<Column<iData>[]>([]);
      const [filters, setFilters] = useState<FilterType<iData>[]>([]);
      const [values, setValues] = useState<ValueType<iData>[]>([]);

      return (
        <Configurator
          data={data}
          rows={rows}
          setRows={setRows}
          columns={columns}
          setColumns={setColumns}
          filters={filters}
          setFilters={setFilters}
          values={values}
          setValues={setValues}
        />
      );
    };

    render(<Wrapper />);

    const trigger = queryByQueryId(document.body, 'query-cookieType');
    await fireEvent.click(trigger!);

    const moveDown = queryByQueryId(document.body, 'rows-move-to-beginning');
    await fireEvent.click(moveDown!);

    // the rows should be reordered
    const rows = queryByQueryId(document.body, 'filtered-rows');
    expect(rows!.children[0].textContent).toContain('cookieType');
    expect(rows!.children[1].textContent).toContain('company');
  });
  it('should handle remove', async () => {
    const Wrapper = () => {
      const [rows, setRows] = useState<Row<iData>[]>([
        {
          label: 'company',
          direction: 'asc',
        },
        {
          label: 'cookieType',
          direction: 'asc',
        },
      ]);
      const [columns, setColumns] = useState<Column<iData>[]>([]);
      const [filters, setFilters] = useState<FilterType<iData>[]>([]);
      const [values, setValues] = useState<ValueType<iData>[]>([]);

      return (
        <Configurator
          data={data}
          rows={rows}
          setRows={setRows}
          columns={columns}
          setColumns={setColumns}
          filters={filters}
          setFilters={setFilters}
          values={values}
          setValues={setValues}
        />
      );
    };

    render(<Wrapper />);

    const trigger = queryByQueryId(document.body, 'query-company');
    await fireEvent.click(trigger!);

    const moveDown = queryByQueryId(document.body, 'rows-remove');
    await fireEvent.click(moveDown!);

    // the rows should be reordered
    const rows = queryByQueryId(document.body, 'filtered-rows');
    expect(rows!.children[0].textContent).toContain('cookieType');
    expect(rows!.children.length).toEqual(1);
  });
  it.skip('should handle closing the context menu', async () => {
    const Wrapper = () => {
      const [rows, setRows] = useState<Row<iData>[]>([
        {
          label: 'company',
          direction: 'asc',
        },
        {
          label: 'cookieType',
          direction: 'asc',
        },
      ]);
      const [columns, setColumns] = useState<Column<iData>[]>([]);
      const [filters, setFilters] = useState<FilterType<iData>[]>([]);
      const [values, setValues] = useState<ValueType<iData>[]>([]);

      return (
        <Configurator
          data={data}
          rows={rows}
          setRows={setRows}
          columns={columns}
          setColumns={setColumns}
          filters={filters}
          setFilters={setFilters}
          values={values}
          setValues={setValues}
        />
      );
    };

    render(<Wrapper />);

    const trigger = queryByQueryId(document.body, 'query-company');
    await fireEvent.click(trigger!);

    const contextMenu = queryByQueryId(document.body, 'rows-context-menu');
    expect(contextMenu?.getAttribute('data-display')).toEqual('open');

    // now, click outside somewhere else
    const div = document.body;
    await fireEvent.click(div);
    expect(contextMenu?.getAttribute('data-display')).toEqual('closed');
  });
});
