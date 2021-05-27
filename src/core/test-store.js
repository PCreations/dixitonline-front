import { createStore } from './store';
import { turnsAdapter } from './turn/entity-adapter';

export const createTestStore = ({ existingTurns = [] } = {}) => {
  const preloadedState = {
    turns: turnsAdapter.addMany(turnsAdapter.getInitialState(), existingTurns),
  };

  return createStore({ preloadedState });
};
