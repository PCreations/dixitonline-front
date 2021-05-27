import { configureStore } from '@reduxjs/toolkit';
import { reducerMap as turnsReducerMap } from './turn';

export const createStore = () =>
  configureStore({
    reducer: {
      ...turnsReducerMap,
    },
  });
