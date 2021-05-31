import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export const turnsAdapter = createEntityAdapter();

const turnsSlice = createSlice({
  name: 'turns',
  initialState: turnsAdapter.getInitialState(),
  reducers: {
    newTurnCreated: turnsAdapter.addOne,
    turnUpdated: turnsAdapter.updateOne,
  },
});

export const selectors = turnsAdapter.getSelectors((state) => state[turnsSlice.name]);

export const reducerMap = { [turnsSlice.name]: turnsSlice.reducer };

export const useCases = {
  newTurnCreated: turnsSlice.actions.newTurnCreated,
  turnUpdated: turnsSlice.actions.turnUpdated,
};
