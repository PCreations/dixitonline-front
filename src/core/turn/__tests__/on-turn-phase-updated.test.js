import { createStore } from '../../store';
import { phaseUpdated } from '../use-cases';
import { createTurnPhaseSelector } from '..';

describe('on turn phase updates received', () => {
  it('updates the turn phase', async () => {
    const store = createStore();
    const phase = {};

    await store.dispatch(phaseUpdated({ phase }));

    const selectTurnPhase = createTurnPhaseSelector();
    expect(selectTurnPhase(store.getState())).toEqual({});
  });
});
