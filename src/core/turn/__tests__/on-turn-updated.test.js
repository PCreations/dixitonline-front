import { createTestStore } from '../../test-store';
import { expectedTurn } from '../test-utils/expected-turn';
import { turnUpdated } from '../use-cases';
import { selectTurnById } from '..';

describe('on turn updated', () => {
  it('updates the turn for the correct turn', async () => {
    const store = createTestStore({ existingTurns: [{ id: 'turnId' }] });
    const turnId = 'turnId';

    await store.dispatch(turnUpdated({ id: turnId }));

    expect(selectTurnById(store.getState(), turnId)).toEqual(expectedTurn({ id: 'turnId' }));
  });

  it('given other turns are in state, it updates the correct turn', async () => {
    const existingTurn = {
      id: 'existingTurnId',
    };
    const turn = {
      id: 'turnId',
    };
    const store = createTestStore({ existingTurns: [existingTurn, turn] });

    await store.dispatch(turnUpdated({ turn }));

    expect(selectTurnById(store.getState(), existingTurn.id)).toEqual(expectedTurn({ id: 'existingTurnId' }));
    expect(selectTurnById(store.getState(), turn.id)).toEqual(expectedTurn({ id: 'turnId' }));
  });
});
