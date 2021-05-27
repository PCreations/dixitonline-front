import { createStore } from '../../store';
import { phaseUpdated } from '../use-cases';
import { createTurnPhaseSelector } from '..';

const createTestTurnPhaseSelector = ({ gameId = '' } = {}) => createTurnPhaseSelector({ gameId });

const expectedPhase = ({ gameId = '' } = {}) => ({
  gameId,
});

describe('on turn phase updates received', () => {
  it('updates the turn phase', async () => {
    const store = createStore();
    const phase = {};

    await store.dispatch(phaseUpdated({ phase }));

    const selectTurnPhase = createTestTurnPhaseSelector();
    expect(selectTurnPhase(store.getState())).toEqual(expectedPhase({}));
  });

  it('updates the turn phase for the correct game', async () => {
    const store = createStore();
    const gameId = 'gameId';
    const phase = {
      gameId,
    };

    await store.dispatch(phaseUpdated({ phase }));

    const selectTurnPhase = createTestTurnPhaseSelector({ gameId });
    expect(selectTurnPhase(store.getState())).toEqual(expectedPhase({ gameId: 'gameId' }));
  });
});
