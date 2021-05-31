export const createInMemoryGameGateway = ({ nextGameId, authenticatedPlayerId }) => {
  return {
    async createNewGame() {
      return {
        id: nextGameId,
        hostId: authenticatedPlayerId,
        status: 'WAITING_FOR_PLAYERS',
      };
    },
  };
};
