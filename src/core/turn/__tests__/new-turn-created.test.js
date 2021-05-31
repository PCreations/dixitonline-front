import { createStore } from '../../store';
import { expectedTurn } from '../test-utils/expected-turn';
import { useCases, selectors } from '..';

describe('new turn created', () => {
  it('adds the new turn', async () => {
    const store = createStore();

    store.dispatch(useCases.newTurnCreated({ id: 'the-created-turn-id', gameId: 'game-id' }));

    expect(selectors.selectById(store.getState(), 'the-created-turn-id')).toEqual(
      expectedTurn({
        id: 'the-created-turn-id',
        gameId: 'game-id',
      })
    );
  });
});
