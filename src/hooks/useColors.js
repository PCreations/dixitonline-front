import { useColorMode } from '@chakra-ui/core';

export const useColors = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'white', dark: '#1b1c1d' };
  const color = { light: '#1b1c1d', dark: 'white' };

  return {
    bgColor: bgColor[colorMode],
    color: color[colorMode],
  };
};
