import { renderHook, act } from '@testing-library/react-hooks';
import { useHook } from '../hooks/useHook';

test.only('useHook', () => {
  const { result } = renderHook(() => useHook());

  act(() => result.current.appendMessage('foo'));
  act(() => result.current.appendMessage('bar'));
  act(() => result.current.appendMessage('foobar'));

  expect(result.current.messages).toEqual(['foo', 'bar', 'foobar']);
});
