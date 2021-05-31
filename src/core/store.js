import { configureStore } from '@reduxjs/toolkit';
import { reducerMap as turnsReducerMap } from './turn';
import { reducerMap as gamesReducerMap } from './game';

export const createStore = ({ preloadedState = {}, gameGateway } = {}) =>
  configureStore({
    reducer: {
      ...turnsReducerMap,
      ...gamesReducerMap,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            gameGateway,
          },
        },
      }),
  });
