import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { PivotTable } from '../../../src';
import { data } from '../../../example/data';
import { headers } from '../../../example/data/headers';

describe('PivotTable', () => {
  it('should render', async () => {
    await act(async () => {
      render(
        <PivotTable
          data={data}
          headers={headers}
          usePivot={false}
          demoMode={true}
        />,
      );
    });

    const headerText = screen.getByTestId('header-text');
    expect(headerText).toHaveTextContent('Basic Table Example');
  });
  it('should render without demo mode', async () => {
    await act(async () => {
      render(
        <PivotTable
          data={data}
          headers={headers}
          usePivot={true}
          demoMode={true}
        />,
      );
    });

    const headerText = screen.getByTestId('header-text');
    expect(headerText).toHaveTextContent('Pivot Table Example');
  });
  it('should render without props', async () => {
    await act(async () => {
      render(<PivotTable data={data} headers={headers} />);
    });
  });
  it('should render without demo mode', async () => {
    await act(async () => {
      render(
        <PivotTable
          data={data}
          headers={headers}
          usePivot={true}
          demoMode={false}
        />,
      );
    });
  });
  it('should toggle pivot mode', async () => {
    const fn = vi.fn();
    await act(async () => {
      render(
        <PivotTable
          data={data}
          headers={headers}
          usePivot={true}
          demoMode={true}
          setUsePivot={fn}
        />,
      );
    });

    const btn = screen.getByTestId('btnPivot');
    await fireEvent.click(btn);
  });
});
