import SplitContainer from '../SplitContainer';
import FooterPanel from './FooterPanel';
import ReportPanel from './ReportPanel';

interface BodyPanelProps<T> {
  data: T[];
}

const BodyPanel = <T,>({ data }: BodyPanelProps<T>) => {
  return (
    <SplitContainer
      parentHeight={75}
      topChild={<ReportPanel data={data} />}
      bottomChild={<FooterPanel />}
    />
  );
};
export default BodyPanel;
