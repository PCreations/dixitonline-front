import { createStore } from './store';
import { turnsAdapter } from './turn';

export const createTestStore = ({ existingTurns = [], gameGateway } = {}) => {
  const preloadedState = {
    turns: turnsAdapter.addMany(turnsAdapter.getInitialState(), existingTurns),
  };

  return createStore({ preloadedState, gameGateway });
};
