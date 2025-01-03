import { useEffect, useState } from 'react';
import NormalTable from './NormalTable';
import Pivot from './pivot';
import Configurator from './Configurator';
import { Column, FilterType, Header, Row, ValueType } from '../../types';
import FiltersController from './modals/FiltersController';

export interface PivotTableProps<T extends object> {
  data: T[];
  headers: Header[];
  usePivot?: boolean;
  setUsePivot?: (usePivot: boolean) => void;
  demoMode?: boolean;
}

const PivotTable = <T extends object>({
  data,
  headers,
  usePivot = true,
  setUsePivot,
  demoMode = true,
}: PivotTableProps<T>) => {
  const [rows, setRows] = useState<Row<T>[]>([]);
  const [filters, setFilters] = useState<FilterType<T>[]>([]);
  const [columns, setColumns] = useState<Column<T>[]>([]);
  const [values, setValues] = useState<ValueType<T>[]>([]);

  useEffect(() => {}, []);

  return (
    <div>
      {demoMode ? (
        <div>
          <h3 data-testid="header-text">
            {usePivot ? 'Pivot Table Example' : 'Basic Table Example'}
          </h3>

          <div className="mb-2 flex justify-between place-items-center">
            <div>
              Total Records:{' '}
              <span className="border rounded-lg shadow-md px-6 py-1 ml-2 bg-slate-200">
                {data.length}
              </span>
            </div>
            <div>
              Total Columns:{' '}
              <span className="border rounded-lg shadow-md px-6 py-1 ml-2 bg-slate-200">
                {Object.keys(data[0]).length}
              </span>
            </div>
            <div>
              <button
                data-testid="btnPivot"
                className=" px-10 py-2 bg-slate-200 rounded-lg shadow-lg text-black ml-2 mr-4 font-medium"
                onClick={() => {
                  if (setUsePivot) {
                    setUsePivot(!usePivot);
                  }
                }}
              >
                {usePivot ? 'UnPivot' : 'Pivot'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <FiltersController filters={filters} headers={headers} data={data} />
      <div className="flex w-full mt-4">
        {usePivot ? (
          <Pivot
            data={data}
            rows={rows}
            setRows={setRows}
            values={values}
            setValues={setValues}
            columns={columns}
          />
        ) : (
          <NormalTable data={data} headers={headers} />
        )}
        {usePivot ? (
          <Configurator
            data={data}
            rows={rows}
            setRows={setRows}
            filters={filters}
            setFilters={setFilters}
            columns={columns}
            setColumns={setColumns}
            values={values}
            setValues={setValues}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PivotTable;
