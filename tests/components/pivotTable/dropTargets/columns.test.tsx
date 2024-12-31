import {
  render,
  act,
  screen,
  fireEvent,
  createEvent,
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { data, iData } from '../../../../example/data';
import '@testing-library/jest-dom';
import { useState } from 'react';
import Configurator from '../../../../src/components/pivotTable/Configurator';
import Columns from '../../../../src/components/pivotTable/dropTargets/Columns';
import { Column, Row } from '../../../../src/types';
import { queryByQueryId } from '../query';

describe('Columns', () => {
  it('should render', async () => {
    await act(async () => {
      render(<Columns columns={[]} setColumns={vi.fn()} />);
    });
  });
  it('should handle drop', async () => {
    const Wrapper = () => {
      const [columns, setColumns] = useState<Column<iData>[]>([]);
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
          columns={columns}
          setColumns={setColumns}
        />
      );
    };

    render(<Wrapper />);

    const field = screen.getByTestId('field-2');
    const columnsContainer = queryByQueryId(document.body, 'columns');
    const dragStartEvent = createEvent.dragStart(field);
    const dragOverEvent = createEvent.dragOver(columnsContainer!);
    const dropEvent = createEvent.drop(columnsContainer!);
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
      fireEvent(columnsContainer!, dragOverEvent);
      fireEvent(columnsContainer!, dropEvent);
    });

    expect(columnsContainer?.children.length).toEqual(1);
  });
});
