import SplitContainer from './SplitContainer';
import HeaderPanel from './panels/HeaderPanel';
import BodyPanel from './panels/bodyPanel';

interface CanvasProps<T> {
  data: T[];
}

const Canvas = <T,>({ data }: CanvasProps<T>) => {
  return (
    <div query-id="canvas" className="w-full">
      <SplitContainer
        parentHeight={25}
        topChild={<HeaderPanel />}
        bottomChild={<BodyPanel data={data} />}
      />
    </div>
  );
};

export default Canvas;
