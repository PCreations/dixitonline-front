import { createGame } from './use-cases';
import { gamesAdapter } from './entity-adapter';

export const extraReducers = {
  [createGame.fulfilled]: (gamesState, action) => {
    gamesAdapter.addOne(gamesState, action.payload);
  },
};
