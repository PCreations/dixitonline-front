import { createStore } from '../../store';
import { expectedTurn } from '../test-utils/expected-turn';
import { newTurnCreated } from '../use-cases';
import { selectTurnById } from '..';

describe('new turn created', () => {
  it('adds the new turn', async () => {
    const store = createStore();

    await store.dispatch(newTurnCreated({ id: 'the-created-turn-id', gameId: 'game-id' }));

    expect(selectTurnById(store.getState(), 'the-created-turn-id')).toEqual(
      expectedTurn({
        id: 'the-created-turn-id',
        gameId: 'game-id',
      })
    );
  });
});
