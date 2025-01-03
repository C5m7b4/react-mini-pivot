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
import { Column, Row, ValueType } from '../../../../src/types';
import { queryByQueryId } from '../query';
import Fields from '../../../../src/components/pivotTable/dropTargets/Fields';

const rows: Row<iData>[] = [
  {
    label: 'company',
    direction: 'asc',
  },
];

const values: ValueType<iData>[] = [
  {
    label: 'unitsSold',
    direction: 'asc',
    aggregator: 'SUM',
  },
];

const columns: Column<iData>[] = [
  {
    label: 'isLoyalty',
    direction: 'asc',
  },
];

describe('Fields', () => {
  it('should render', async () => {
    await act(async () => {
      render(<Fields data={data} rows={[]} values={[]} columns={[]} />);
    });
    const fieldList = screen.getByTestId('fields');
    expect(fieldList.children.length).toEqual(8);
  });
  it('should handle some input data', async () => {
    await act(async () => {
      render(
        <Fields data={data} rows={rows} values={values} columns={columns} />,
      );
    });

    // check for rows
    const company = queryByQueryId(document.body, 'query-field-5');
    expect(company!.classList).toContain('border');
    const checkbox = company!.querySelector('input');
    expect(checkbox!.checked).toBeTruthy();

    // check for values
    const unitsSold = queryByQueryId(document.body, 'query-field-6');
    expect(unitsSold!.classList).toContain('border');
    const checkbox3 = unitsSold!.querySelector('input');
    expect(checkbox3!.checked).toBeTruthy();

    // check for columns
    const isLoyalty = queryByQueryId(document.body, 'query-field-2');
    expect(isLoyalty!.classList).toContain('border');
    const checkbox2 = isLoyalty!.querySelector('input');
    expect(checkbox2!.checked).toBeTruthy();
  });
  it('should handle a query', async () => {
    await act(async () => {
      render(
        <Fields
          data={data}
          rows={rows}
          values={values}
          columns={columns}
          query={'c'}
        />,
      );
    });

    const fieldsContainer = screen.getByTestId('fields');
    expect(fieldsContainer!.children.length).toEqual(2);
  });
});
