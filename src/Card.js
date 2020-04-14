import React from 'react';
import { Flex, Image } from '@chakra-ui/core';
import { Avatar } from './Avatar';

export const Card = ({ id, src, onClick, votes = [], bordered }) =>
  votes.length === 0 ? (
    <Flex key={id} justifyContent="center" onClick={() => onClick({ id })}>
      <Image
        centered
        src={src}
        maxWidth="100%"
        style={{ cursor: 'pointer', border: `${bordered ? '5px solid green' : ''}` }}
      />
    </Flex>
  ) : (
    <div style={{ position: 'relative', maxWidth: '400px' }}>
      <Flex key={id} justifyContent="center" onClick={() => onClick({ id })}>
        <Image
          centered
          src={src}
          maxWidth="100%"
          style={{ cursor: 'pointer', border: `${bordered ? '5px solid green' : ''}` }}
        />
      </Flex>
      <div style={{ position: 'absolute', bottom: '5%', right: '5%' }}>
        <Flex justifyContent="flex-end" wrap="wrap">
          {votes.map((username, index) => (
            <div style={{ marginRight: '5px' }} key={`${index}${username}`}>
              <Avatar username={username} />
            </div>
          ))}
        </Flex>
      </div>
    </div>
  );
