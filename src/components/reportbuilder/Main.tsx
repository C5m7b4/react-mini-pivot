import Canvas from './Canvas';
import Properties from './Properties';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import { useEffect, useContext } from 'react';
import { AppContext } from './AppProvider';

interface MainProps<T> {
  data: T[];
}

const Main = <T,>({ data }: MainProps<T>) => {
  const context = useContext(AppContext);

  const handleKeydown = (e: KeyboardEvent) => {
    if (context) {
      switch (e.code) {
        case 'ArrowUp':
          break;
        case 'ArrowDown':
          break;
        case 'ArrowLeft':
          const newLeft = context.left - 50;
          context.setLeft(newLeft);
          break;
        case 'ArrowRight':
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);
  return (
    <div className="p-4 ">
      <div className="flex justify-between">
        <h2>Report Builder</h2>
        <div>
          Mode:{' '}
          {context?.liveMode ? (
            <span className="text-red-600 font-medium text-2xl">Live</span>
          ) : (
            <span>off</span>
          )}
        </div>
        <div>Active Tool?: {context?.activeTool ? 'True' : 'false'}</div>
      </div>
      <Toolbar />
      <div className="w-full flex gap-4">
        <div className="w-1/6 rounded-lg shadow-md">
          <Sidebar data={data} />
        </div>
        <div className="canvas border rounded-lg shadow-md flex-1">
          <Canvas data={data} />
        </div>
        <div>
          <Properties data={data} />
        </div>
      </div>
    </div>
  );
};

export default Main;
