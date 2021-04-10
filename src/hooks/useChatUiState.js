import { useState, useEffect } from 'react';

export const useChatUiState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setUnreadMessages(0);
    }
  }, [isOpen, setUnreadMessages]);

  return {
    isOpen,
    text,
    messages,
    unreadMessages,
    toggle() {
      setIsOpen(!isOpen);
    },
    setText,
    appendMessage(message) {
      setMessages((prevMessages) => [...prevMessages, message]);
      if (!isOpen) setUnreadMessages((prevUnreadMessages) => prevUnreadMessages + 1);
    },
  };
};
