export const createInMemoryGameGateway = ({ nextGameId, authenticatedPlayerId }) => {
  return {
    async createGame() {
      return {
        id: nextGameId,
        hostId: authenticatedPlayerId,
        status: 'WAITING_FOR_PLAYERS',
      };
    },
  };
};
