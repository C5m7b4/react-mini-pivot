import { act, render, screen } from '@testing-library/react';
import Pivot from '../../../src/components/pivotTable/pivot';
import { describe, it, expect, vi } from 'vitest';
import { Row, ValueType } from '../../../src';
import { data } from '../../../example/data';

describe('Pivot', () => {
  it('should render', async () => {
    await act(async () => {
      render(
        <Pivot
          data={data}
          rows={[]}
          setRows={vi.fn()}
          values={[]}
          setValues={vi.fn()}
          columns={[]}
        />,
      );
    });
  });
});
