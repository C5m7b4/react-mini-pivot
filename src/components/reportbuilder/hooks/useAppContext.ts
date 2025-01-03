import { AppContext, AppContextType } from '../AppProvider';
import { useContext } from 'react';

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
