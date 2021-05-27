import { createStore } from '../../store';
import { newTurnCreated } from '../use-cases';
import { selectTurnById } from '..';

describe('new turn created', () => {
  it('adds the new turn', async () => {
    const store = createStore();

    await store.dispatch(newTurnCreated({ id: 'the-created-turn-id' }));

    expect(selectTurnById(store.getState(), 'the-created-turn-id')).toEqual({
      id: 'the-created-turn-id',
    });
  });
});
