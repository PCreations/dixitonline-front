import React from 'react';
import 'react-toggle/style.css';
import { useColorMode, Icon } from '@chakra-ui/core';
import { Segment } from 'semantic-ui-react';
import Toggle from 'react-toggle';

export const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Segment basic textAlign="center">
      <label>
        <script text="style/css">{`
        .react-toggle--checked .react-toggle-track {
          background-color: white;
        }
      `}</script>
        <Toggle
          defaultChecked={colorMode === 'dark'}
          className
          icons={{
            checked: <Icon name="moon" position="relative" top={'-3px'} left={'3px'} />,
            unchecked: <Icon name="sun" color="yellow.500" position="relative" top={'-3px'} right={'3px'} />,
          }}
          onChange={toggleColorMode}
        />
      </label>
    </Segment>
  );
};
