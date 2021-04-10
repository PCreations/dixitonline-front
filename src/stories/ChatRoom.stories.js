import React, { useEffect, useRef } from 'react';
import { MdSend } from 'react-icons/md';
import { Stack, Box, Flex, Text, InputGroup, Input, InputRightElement, IconButton, CSSReset } from '@chakra-ui/core';
import { useChatUiState } from '../hooks';
import { Avatar } from '../Avatar';
export default { title: 'ChatRoom' };

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

const ChatMessage = React.forwardRef(({ self, id, username, text }, ref) => (
  <Flex
    ref={ref}
    key={id}
    width="80%"
    alignSelf={self ? 'flex-end' : 'flex-start'}
    flexDirection={self ? 'row-reverse' : 'row'}
    mb={2}
  >
    <Avatar username={username} size="sm" />
    <Text ml={1} mr={1} backgroundColor={self ? 'gray.300' : 'gray.100'} padding={2} rounded={10}>
      {text}
    </Text>
  </Flex>
));

const MessagesList = React.memo(({ messages }) => (
  <Flex overflowY="auto" maxHeight={['100%', 500]} minH={[100]}>
    <Stack spacing={2} pl={2} pr={2} flexDirection="column">
      {messages.map((message) => (
        <ChatMessage {...message} self={message.username === 'Marie'} key={message.id} />
      ))}
    </Stack>
  </Flex>
));

const ChatRoom = () => {
  const chatState = useChatUiState({
    messages: [
      buildTestMessage().build(),
      buildTestMessage({
        username: 'Marie',
        text:
          'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
      }).build(),
      buildTestMessage({ username: 'Anthow' }).build(),
    ],
  });

  console.log(chatState.messages);

  const sendMessage = () => {
    chatState.setText('');
    chatState.appendMessage(
      buildTestMessage({
        text: chatState.text,
        username: 'Marie',
      }).build()
    );
  };

  return (
    <Box>
      <CSSReset />
      <Flex border="1px" borderRadius="md" borderColor="gray.200" width={['100%', 1 / 4, 1 / 4]} flexDirection="column">
        <MessagesList messages={chatState.messages} />
        <Flex p={2} bg="blue.50">
          <InputGroup w="100%">
            <Input
              type="text"
              placeholder="Jot something down to other players"
              variant="flushed"
              color="black"
              value={chatState.text}
              onChange={(event) => chatState.setText(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  sendMessage();
                }
              }}
            />
            <InputRightElement>
              <IconButton
                variant="outline"
                variantColor="gray"
                aria-label="send message"
                icon={MdSend}
                size="lg"
                onClick={sendMessage}
              />
            </InputRightElement>
          </InputGroup>
        </Flex>
      </Flex>
    </Box>
  );
};

export const chat = () => <ChatRoom />;
