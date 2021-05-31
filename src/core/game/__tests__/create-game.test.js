import { useCases, selectors } from '..';
import { createTestStore } from '../../test-store';
import { createInMemoryGameGateway } from '../gateways';

describe('create game', () => {
  it('creates a new game', async () => {
    const gameGateway = createInMemoryGameGateway({
      nextGameId: 'game-id',
      authenticatedPlayerId: 'authenticated-player-id',
    });
    const store = createTestStore({ gameGateway });

    await store.dispatch(useCases.createGame());

    const game = selectors.selectById(store.getState(), 'game-id');

    expect(game).toEqual({
      id: 'game-id',
      hostId: 'authenticated-player-id',
      status: 'WAITING_FOR_PLAYERS',
    });
  });
});
