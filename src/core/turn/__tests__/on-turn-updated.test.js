import { createTestStore } from '../../test-store';
import { expectedTurn } from '../test-utils/expected-turn';
import { selectors, useCases } from '..';

describe('on turn updated', () => {
  it('updates the turn for the correct turn', async () => {
    const store = createTestStore({ existingTurns: [{ id: 'turnId' }] });
    const turnId = 'turnId';

    store.dispatch(useCases.turnUpdated({ id: turnId }));

    expect(selectors.selectById(store.getState(), turnId)).toEqual(expectedTurn({ id: 'turnId' }));
  });

  it('given other turns are in state, it updates the correct turn', () => {
    const existingTurn = {
      id: 'existingTurnId',
    };
    const turn = {
      id: 'turnId',
    };
    const store = createTestStore({ existingTurns: [existingTurn, turn] });

    store.dispatch(useCases.turnUpdated({ turn }));

    expect(selectors.selectById(store.getState(), existingTurn.id)).toEqual(expectedTurn({ id: 'existingTurnId' }));
    expect(selectors.selectById(store.getState(), turn.id)).toEqual(expectedTurn({ id: 'turnId' }));
  });
});
