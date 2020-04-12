import React from 'react';
import { ThemeProvider } from '@chakra-ui/core';

export const themeDecorator = (storyFn) => <ThemeProvider>{storyFn()}</ThemeProvider>;
