import React from 'react';
import { Avatar as BaseAvatar, Flex } from '@chakra-ui/core';
import { Icon } from 'semantic-ui-react';
import { useColors } from './hooks/useColors';

const AvatarIcon = ({ ready }) => {
  const { color } = useColors();
  return (
    <Icon
      name={ready ? 'check circle outline' : 'hourglass start'}
      style={{ position: 'absolute', right: '-8px', bottom: '8px', color }}
    />
  );
};

export const Avatar = ({ username, grayBorder, ready, showUsername, size = 'md' }) => {
  const { color } = useColors();
  const borderProps = grayBorder
    ? {
        showBorder: true,
        border: '2px',
        borderColor: color,
      }
    : {};
  return (
    <Flex alignItems="center" color={color}>
      <BaseAvatar name={username} {...borderProps} size={size}>
        {typeof ready !== 'undefined' && <AvatarIcon ready={ready} />}
      </BaseAvatar>
      {showUsername && <span style={{ paddingLeft: '10px' }}>{username}</span>}
    </Flex>
  );
};
