import { createAsyncThunk } from '@reduxjs/toolkit';

export const createGame = createAsyncThunk('game/createGame', async (_, { extra: { gameGateway } }) => {
  const game = await gameGateway.createNewGame();

  return game;
});
