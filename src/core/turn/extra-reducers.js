import { turnUpdated, newTurnCreated } from './use-cases';
import { turnsAdapter } from './entity-adapter';

export const extraReducers = {
  [turnUpdated.fulfilled]: (turnsState, action) => {
    turnsAdapter.updateOne(turnsState, action.payload);
  },
  [newTurnCreated.fulfilled]: (turnsState, action) => {
    turnsAdapter.addOne(turnsState, action.payload);
  },
};