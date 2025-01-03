import { data, iData } from '../data';
import { PivotTable, ReportBuilder } from '../../src';
import '../../dist/index.css';
import { headers } from '../data/headers';
import { useState } from 'react';

function App() {
  const [usePivot, setUsePivot] = useState<boolean>(false);
  return (
    <div className="p-6">
      {/* <PivotTable<iData>
        data={data}
        headers={headers}
        usePivot={usePivot}
        setUsePivot={setUsePivot}
      /> */}
      <ReportBuilder<iData> data={data} />
    </div>
  );
}

export default App;
