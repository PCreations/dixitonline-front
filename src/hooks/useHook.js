import { useState } from 'react';

export const useHook = () => {
  const [messages, setMessages] = useState([]);

  return {
    messages,
    appendMessage(msg) {
      setMessages([...messages, msg]);
    },
  };
};
