import { createContext, useState } from 'react';
import { MessageProps, ToolProps } from './types';

export interface AppContextType {
  activeTool: ToolProps;
  setActiveTool: (tool: ToolProps) => void;
  activeTools: ToolProps[];
  setActiveTools: (tools: ToolProps[]) => void;
  liveMode: boolean;
  setLiveMode: (liveMode: boolean) => void;
  reportTools: ToolProps[];
  setReportTools: (tools: ToolProps[]) => void;
  headerTools: ToolProps[];
  setHeaderTools: (tools: ToolProps[]) => void;
  footerTools: ToolProps[];
  setFooterTools: (tools: ToolProps[]) => void;
  messages: MessageProps[];
  setMessages: (messages: MessageProps[]) => void;
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
    toolSection: 'none',
  });
  const [liveMode, setLiveMode] = useState<boolean>(false);
  const [headerTools, setHeaderTools] = useState<ToolProps[]>([]);
  const [footerTools, setFooterTools] = useState<ToolProps[]>([]);
  const [reportTools, setReportTools] = useState<ToolProps[]>([]);
  const [activeTools, setActiveTools] = useState<ToolProps[]>([]);
  const [messages, setMessages] = useState<MessageProps[]>([]);

  return (
    <AppContext.Provider
      value={{
        activeTool,
        setActiveTool,
        activeTools,
        setActiveTools,
        liveMode,
        setLiveMode,
        headerTools,
        setHeaderTools,
        reportTools,
        setReportTools,
        footerTools,
        setFooterTools,
        messages,
        setMessages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
