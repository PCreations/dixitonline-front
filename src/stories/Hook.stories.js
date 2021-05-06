import React, { useEffect } from 'react';
import { useHook } from '../hooks/useHook';

export default { title: 'HookTest' };

export const HookTest = () => {
  const { messages, appendMessage } = useHook();

  appendMessage('foo');
  appendMessage('bar');
  appendMessage('foobar');

  return (
    <ul>
      {messages.map((txt, i) => (
        <li key={i}>{txt}</li>
      ))}
    </ul>
  );
};
