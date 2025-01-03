import { useEffect, useContext } from 'react';
import { AppContext } from '../AppProvider';
import { MessageProps } from '../types';

const Messages = () => {
  const context = useContext(AppContext);

  useEffect(() => {
    setTimeout(() => {
      const newMessages = context?.messages;
      newMessages?.splice(-1, 1);
      context?.setMessages(newMessages!);
    }, 5000);
  }, [context?.messages]);

  const getClassName = (message: MessageProps) => {
    switch (message.type) {
      case 'warning':
        return 'bg-orange-500 text-white';
        break;
      case 'error':
        return 'bg-red-600 text-white';
        break;
      case 'info':
        return 'bg-blue-500 text-white';
        break;
      case 'success':
        return 'bg-green-500 text-white';
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="px-2 py-4 overflow-y-scroll overflow-x-hidden"
      style={{ maxHeight: '200px' }}
    >
      <div className="border-b mb-2">Messages</div>
      {context?.messages.reverse().map((message, i) => {
        return (
          <div
            key={`msg-${i}`}
            className={`${getClassName(message)} pl-2 shadow-md mb-2`}
          >
            {message.message}
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
