import {
  act,
  createEvent,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import Thead from '../../../src/components/pivotTable/Thead';
import { describe, it, expect, vi } from 'vitest';
import { Row, Column } from '../../../src';
import { data } from '../../../example/data/index';
import { iData } from '../../../example/data';

const rows: Row<iData>[] = [
  {
    label: 'company',
    direction: 'asc',
    inclusions: [],
  },
  {
    label: 'cookieType',
    direction: 'asc',
    inclusions: [],
  },
];

describe('Thead', () => {
  it('should render', async () => {
    await act(async () => {
      render(
        <Thead<iData>
          rows={[]}
          data={data}
          values={[]}
          column={{ label: 'company', direction: 'asc' }}
          setRows={vi.fn()}
          setColumn={vi.fn()}
          handleSort={vi.fn()}
          inclusions={[]}
          setInclusions={vi.fn()}
          handleAliasClick={vi.fn()}
          handleFormatterClick={vi.fn()}
          columns={[]}
        />,
      );
    });
  });
  it('should show the context menu', async () => {
    await act(async () => {
      render(
        <Thead<iData>
          rows={rows}
          data={data}
          values={[]}
          column={{ label: 'company', direction: 'asc' }}
          setRows={vi.fn()}
          setColumn={vi.fn()}
          handleSort={vi.fn()}
          inclusions={[]}
          setInclusions={vi.fn()}
          handleAliasClick={vi.fn()}
          handleFormatterClick={vi.fn()}
          columns={[]}
        />,
      );
    });

    const header = screen.getByTestId('table-header');
    const contextMenuEvent = createEvent.contextMenu(header);
    await fireEvent(header, contextMenuEvent);

    const createAlias = screen.getByText(/create alias/i);
    expect(createAlias).toBeInTheDocument();
    const addFormatter = screen.getByText(/add formatter/i);
    expect(addFormatter).toBeInTheDocument();
  });
  it('should be able to hid an exclusion', async () => {
    await act(async () => {
      render(
        <Thead<iData>
          rows={rows}
          data={data}
          values={[]}
          column={{ label: 'company', direction: 'asc' }}
          setRows={vi.fn()}
          setColumn={vi.fn()}
          handleSort={vi.fn()}
          inclusions={['company']}
          setInclusions={vi.fn()}
          handleAliasClick={vi.fn()}
          handleFormatterClick={vi.fn()}
          columns={[]}
        />,
      );
    });

    const headerTextThatShouldNotBeThere = screen.queryByText('company');
    expect(headerTextThatShouldNotBeThere).not.toBeInTheDocument();
  });
  it('should handle the sort direction click', async () => {
    await act(async () => {
      render(
        <Thead<iData>
          rows={rows}
          data={data}
          values={[]}
          column={{ label: 'company', direction: 'asc' }}
          setRows={vi.fn()}
          setColumn={vi.fn()}
          handleSort={vi.fn()}
          inclusions={[]}
          setInclusions={vi.fn()}
          handleAliasClick={vi.fn()}
          handleFormatterClick={vi.fn()}
          columns={[]}
        />,
      );
    });

    const sortButton = screen.getByTestId('sort-direction');
    await fireEvent.click(sortButton);
  });
});
