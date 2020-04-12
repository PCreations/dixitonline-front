import React from 'react';
import { Avatar as BaseAvatar, Flex } from '@chakra-ui/core';
import { Icon } from 'semantic-ui-react';

const AvatarIcon = ({ ready }) => (
  <Icon
    name={ready ? 'check circle outline' : 'hourglass start'}
    style={{ position: 'absolute', right: '-8px', bottom: '8px', color: 'black' }}
  />
);

export const Avatar = ({ username, grayBorder, ready, showUsername }) => {
  const borderProps = grayBorder
    ? {
        showBorder: true,
        border: '2px',
        borderColor: 'gray.500',
      }
    : {};
  return (
    <Flex alignItems="center">
      <BaseAvatar name={username} {...borderProps}>
        {typeof ready !== 'undefined' && <AvatarIcon ready={ready} />}
      </BaseAvatar>
      {showUsername && <span style={{ paddingLeft: '10px' }}>{username}</span>}
    </Flex>
  );
};
