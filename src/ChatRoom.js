import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { MdSend } from 'react-icons/md';
import { IoChatbubbles } from 'react-icons/io5';
import {
  Stack,
  Box,
  Flex,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  CSSReset,
  CloseButton,
  Collapse,
  Badge,
} from '@chakra-ui/core';
import { firebaseApp } from './firebase-app';
import { useChatUiState } from './hooks';
import { Avatar } from './Avatar';
export default { title: 'ChatRoom' };

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

const MessagesList = React.memo(({ messages, userId }) => {
  const messageEndRef = useRef(null);

  useEffect(() => {
    console.log('message ref current', messageEndRef.current);
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <Flex overflowY="auto" minH={[100]} maxHeight="500px">
      <Stack spacing={2} p={2} flexDirection="column" width="100%">
        {messages.map((message) => (
          <ChatMessage {...message} self={message.userId === userId} key={message.id} />
        ))}
        <div ref={messageEndRef} style={{ height: 1, width: '100%' }}></div>
      </Stack>
    </Flex>
  );
});

export const ChatRoom = ({ username, userId, gameId }) => {
  const chatState = useChatUiState();

  useEffect(() => {
    const handleNewMessage = (snp) => {
      chatState.appendMessage(snp.val());
    };

    firebaseApp.database().ref(`rooms/${gameId}`).on('child_added', handleNewMessage);

    return () => firebaseApp.database().ref(`rooms/${gameId}`).off('child_added', handleNewMessage);
  }, []);

  const sendMessage = () => {
    if (chatState.text.trim() === '') return;
    const messageRef = firebaseApp.database().ref(`rooms/${gameId}`).push();
    messageRef.set({
      id: messageRef.key,
      text: chatState.text,
      userId,
      username,
    });
    chatState.setText('');
    firebaseApp.analytics().logEvent('message_sent', {
      gameId,
      userId,
      username,
    });
  };

  return (
    <Box>
      <CSSReset />
      <Flex
        border={chatState.isOpen ? '1px' : 0}
        borderColor="gray.200"
        backgroundColor={chatState.isOpen ? 'white' : 'none'}
        zIndex={10}
        width={chatState.isOpen ? ['80%', 300] : 'auto'}
        minWidth={chatState.isOpen ? 300 : 'auto'}
        flexDirection="column"
        position="fixed"
        bottom={0}
        right={0}
      >
        <Flex p={2} bg={chatState.isOpen ? '#413842' : 'none'} alignItems="center" justifyContent="space-between">
          {chatState.isOpen ? (
            <>
              <Box as={IoChatbubbles} size={10} color="#DEBB81" />
              <Text color="#DEBB81" ml={4}>
                Game Chat
              </Text>
              <CloseButton justifySelf="flex-end" color="#DEBB81" onClick={chatState.toggle} />
            </>
          ) : (
            <Flex flexDirection="column">
              {chatState.unreadMessages > 0 && (
                <Badge variantColor="red" textAlign="center">
                  NEW
                </Badge>
              )}
              <IconButton
                icon={IoChatbubbles}
                color="#DEBB81"
                bg="none"
                isRound
                size="lg"
                onClick={chatState.toggle}
                fontSize="3.5rem"
              />
            </Flex>
          )}
        </Flex>
        <Collapse isOpen={chatState.isOpen}>
          <MessagesList messages={chatState.messages} userId={userId} />
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
        </Collapse>
      </Flex>
    </Box>
  );
};
