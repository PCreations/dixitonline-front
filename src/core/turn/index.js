import { createSlice } from '@reduxjs/toolkit';
import { turnsAdapter } from './entity-adapter';
import { extraReducers } from './extra-reducers';

const turnsSlice = createSlice({
  name: 'turns',
  initialState: turnsAdapter.getInitialState(),
  extraReducers,
});

const turnsSelectors = turnsAdapter.getSelectors((state) => state[turnsSlice.name]);

export const selectTurnById = turnsSelectors.selectById;
export const reducerMap = { [turnsSlice.name]: turnsSlice.reducer };
