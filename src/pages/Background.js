import React from 'react';
import { Box } from '@chakra-ui/core';
import { useColors } from '../hooks/useColors';

export const Background = ({ children }) => {
  const { bgColor, color } = useColors();

  return (
    <Box bg={bgColor} color={color}>
      {children}
    </Box>
  );
};
