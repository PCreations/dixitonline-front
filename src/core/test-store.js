import { createStore } from './store';
import { turnsAdapter } from './turn/entity-adapter';
import { gamesAdapter } from './game/entity-adapter';

export const createTestStore = ({ existingTurns = [], gameGateway } = {}) => {
  const preloadedState = {
    turns: turnsAdapter.addMany(turnsAdapter.getInitialState(), existingTurns),
    games: gamesAdapter.getInitialState(),
  };

  return createStore({ preloadedState, gameGateway });
};
