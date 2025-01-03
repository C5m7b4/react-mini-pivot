import { useAppContext } from './useAppContext';

export const useActiveTool = () => {
  const { activeTool } = useAppContext();
  if (!activeTool || !activeTool.queryId) return { activeTool: null };
  const div = document.querySelector(
    `[query-id="${activeTool.queryId}"]`,
  ) as HTMLDivElement;
  if (div) {
    const box = div.getBoundingClientRect();
    if (box) {
      activeTool.box = box;
    }
    activeTool.el = div;
  }

  return { activeTool };
};
