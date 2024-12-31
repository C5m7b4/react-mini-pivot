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
import { Row } from '../../../../src/types';

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
});
