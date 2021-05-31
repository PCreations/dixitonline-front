import { createSlice } from '@reduxjs/toolkit';
import { gamesAdapter } from './entity-adapter';
import { extraReducers } from './extra-reducers';

const gamesSlice = createSlice({
  name: 'games',
  initialState: gamesAdapter.getInitialState(),
  extraReducers,
});

const gamesSelectors = gamesAdapter.getSelectors((state) => state[gamesSlice.name]);

export const selectGameById = gamesSelectors.selectById;
export const reducerMap = { [gamesSlice.name]: gamesSlice.reducer };
