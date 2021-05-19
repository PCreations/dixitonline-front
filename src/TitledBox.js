import React from 'react';
import { Flex } from '@chakra-ui/core';
import { Header } from './Header';

export const TitledBox = ({ title, children, noSidePadding, fullWidth }) => {
  return (
    <Flex justifyContent="center">
      <fieldset
        style={{
          width: '100%',
          ...(fullWidth ? {} : { maxWidth: '600px' }),
          ...(noSidePadding ? { padding: '10px 0px' } : {}),
        }}
      >
        <Header size="medium" as="legend" textAlign="center">
          {title}
        </Header>
        {children}
      </fieldset>
    </Flex>
  );
};
