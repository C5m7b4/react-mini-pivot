import { createContext, useState } from 'react';
import { ToolProps } from './types';

export interface AppContextType {
  activeTool: ToolProps;
  setActiveTool: (tool: ToolProps) => void;
  liveMode: boolean;
  setLiveMode: (liveMode: boolean) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const [activeTool, setActiveTool] = useState<ToolProps>({
    fieldType: '',
    x: 0,
    y: 0,
    height: 0,
    width: 0,
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontVariant: 'none',
    queryId: '',
    text: '',
    textAlign: 'left',
    textDecoration: 'none',
    lineHeight: 16,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  });
  const [liveMode, setLiveMode] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        activeTool,
        setActiveTool,
        liveMode,
        setLiveMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
