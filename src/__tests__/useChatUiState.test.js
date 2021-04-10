import { renderHook } from '@testing-library/react-hooks';
import { useChatUiState } from '../hooks';

const renderUseChatUiState = () => renderHook(() => useChatUiState());

const renderOpenedChatUiState = () => {
  const renderResult = renderUseChatUiState();
  renderResult.result.current.toggle();

  return renderResult;
};

const renderUseChatUiStateWithMessages = (messages = []) => {
  const renderResult = renderUseChatUiState();
  messages.forEach((msg) => renderResult.result.current.appendMessage(msg));

  return renderResult;
};

const renderChatUiStateWithUnreadMessages = (count) => {
  const renderResult = renderUseChatUiState();
  new Array(count).fill().forEach(() => renderResult.result.current.appendMessage(buildTestMessage().build()));

  return renderResult;
};

const buildTestMessage = ({ id = `id-${Math.random()}`, text = 'Hello World', username = 'Pierre' } = {}) => {
  const props = {
    id,
    text,
    username,
  };

  return {
    build() {
      return props;
    },
  };
};

describe.only('useChatUiState', () => {
  describe('open/close toggle', () => {
    test('the chat should be closed by default', () => {
      // arrange
      const { result } = renderUseChatUiState();

      // assert
      expect(result.current.isOpen).toBe(false);
    });

    test('the chat can be toggled from close to open', () => {
      // arrange
      const { result } = renderUseChatUiState();

      //act
      result.current.toggle();

      // assert
      expect(result.current.isOpen).toBe(true);
    });

    test('the chat can be toggled from open to close', () => {
      // arrange
      const { result } = renderOpenedChatUiState();

      //act
      result.current.toggle();

      // assert
      expect(result.current.isOpen).toBe(false);
    });
  });
  describe('text input', () => {
    test('the text input is empty by default', () => {
      // arrange
      const { result } = renderUseChatUiState();

      // assert
      expect(result.current.text).toBe('');
    });

    test('the input can be updated', () => {
      // arrange
      const { result } = renderUseChatUiState();

      // act
      result.current.setText('hello world');

      // assert
      expect(result.current.text).toBe('hello world');
    });
  });
  describe('messages list', () => {
    test('the messages list is empty by default', () => {
      // arrange
      const { result } = renderUseChatUiState();

      // assert
      expect(result.current.messages).toEqual([]);
    });
    test('append message', () => {
      // arrange
      const { result } = renderUseChatUiState();
      const message = buildTestMessage().build();

      // act
      result.current.appendMessage(message);

      // assert
      expect(result.current.messages[0]).toEqual(message);
    });

    test.only('append message at the bottom of the list', () => {
      // arrange
      const messages = [buildTestMessage().build()];
      const newMessage = buildTestMessage().build();
      const { result } = renderUseChatUiStateWithMessages(messages);

      // act
      result.current.appendMessage(newMessage);

      // assert
      expect(result.current.messages[1]).toEqual(newMessage);
    });
  });
  describe('unread messages', () => {
    test('by default the number of unread messages is 0', () => {
      // arrange
      const { result } = renderUseChatUiState();

      // assert
      expect(result.current.unreadMessages).toEqual(0);
    });
    test('when a new message is added while the chat is CLOSED, the number of unread messages DOES increase', () => {
      // arrange
      const { result } = renderUseChatUiState();

      // act
      result.current.appendMessage(buildTestMessage().build());

      // assert
      expect(result.current.unreadMessages).toEqual(1);
    });

    test('when a new message is added while the chat is OPEN, the number of unread messages DOES NOT increase', () => {
      // arrange
      const { result } = renderOpenedChatUiState();

      // act
      result.current.appendMessage(buildTestMessage().build());

      // assert
      expect(result.current.unreadMessages).toEqual(0);
    });

    test('opening the chat while there are some unread messages resets the number of unread messages', async () => {
      // arrange
      const { result, waitForValueToChange } = renderChatUiStateWithUnreadMessages(2);

      // act
      result.current.toggle();
      await waitForValueToChange(() => result.current.unreadMessages);

      // assert
      expect(result.current.unreadMessages).toEqual(0);
    });
  });
  describe('send message', () => {});
});
