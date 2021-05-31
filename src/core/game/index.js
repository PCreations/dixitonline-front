import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';

export const gamesAdapter = createEntityAdapter();

const createGame = createAsyncThunk('games/createGame', (_, { extra: { gameGateway } }) => gameGateway.createGame());

const gamesSlice = createSlice({
  name: 'games',
  initialState: gamesAdapter.getInitialState(),
  extraReducers: {
    [createGame.fulfilled]: gamesAdapter.addOne,
  },
});

export const selectors = gamesAdapter.getSelectors((state) => state[gamesSlice.name]);

export const reducerMap = { [gamesSlice.name]: gamesSlice.reducer };

export const useCases = {
  createGame,
};
