import React from 'react';
import { ThemeProvider } from '@chakra-ui/core';
import { I18nProvider } from '../src/I18nProvider';

export const themeDecorator = (storyFn) => (
  <ThemeProvider>
    <I18nProvider>{storyFn()}</I18nProvider>
  </ThemeProvider>
);
