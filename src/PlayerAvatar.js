import React, { useContext } from 'react';
import { Avatar } from '@chakra-ui/core';
import { AuthContext } from './AuthContext';

export const PlayerAvatar = () => {
  const { username, photoURL } = useContext(AuthContext);
  return <Avatar name={username} src={photoURL} />;
};
