import React from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/core';

export const Error = ({ title, message }) => {
  console.error({ title, message });
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
      <AlertDescription>{Array.isArray(message) ? JSON.stringify(message) : message}</AlertDescription>
    </Alert>
  );
};
