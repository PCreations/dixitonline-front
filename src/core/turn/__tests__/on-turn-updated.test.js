import { createStore } from '../../store';
import { turnUpdated } from '../use-cases';
import { selectTurnById } from '..';

const expectedTurn = ({ id = '' } = {}) => ({
  id,
});

describe('on turn updated', () => {
  it('updates the turn for the correct turn', async () => {
    const store = createStore();
    const turnId = 'turnId';

    await store.dispatch(turnUpdated({ id: turnId }));

    expect(selectTurnById(store.getState(), turnId)).toEqual(expectedTurn({ id: 'turnId' }));
  });

  xit('given other turns are in state, it updates the correct turn', async () => {
    const existingTurn = {
      id: 'existingTurnId',
    };
    const store = createStore({ existingTurn });
    const updatedTurn = {
      id: 'turnId',
    };

    await store.dispatch(turnUpdated({ turn: updatedTurn }));

    expect(selectTurnById(store.getState(), existingTurn.id)).toEqual(expectedTurn({ id: 'exinstingTurnId' }));
    expect(selectTurnById(store.getState(), updatedTurn.id)).toEqual(expectedTurn({ id: 'turnId' }));
  });
});
