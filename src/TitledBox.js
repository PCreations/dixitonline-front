import React from 'react';
import { Header } from 'semantic-ui-react';
import { Flex } from '@chakra-ui/core';

export const TitledBox = ({ title, children, noSidePadding, fullWidth }) => (
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
