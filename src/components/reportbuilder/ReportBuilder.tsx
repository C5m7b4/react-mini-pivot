import AppProvider from './AppProvider';
import Main from './Main';

interface ReportBuilderProps<T> {
  data: T[];
}

const ReportBuilder = <T,>({ data }: ReportBuilderProps<T>) => {
  return (
    <AppProvider>
      <Main data={data} />
    </AppProvider>
  );
};

export default ReportBuilder;
