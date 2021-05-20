import { useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

const GameFragment = gql`
  fragment Game on Game {
    id
    currentTurnId
    endCondition {
      __typename
      ... on GameRemainingTurnsEndCondition {
        remainingTurns
      }
      ... on GameScoreLimitEndCondition {
        scoreLimit
      }
    }
    status
    host {
      id
      username: name
    }
    players {
      id
      username: name
      score
    }
  }
`;

const GET_GAME = gql`
  query GetGame($gameId: ID!) {
    game(gameId: $gameId) {
      ...Game
    }
  }
  ${GameFragment}
`;

export const useGamePolling = ({ gameId }) => {
  const {
    loading,
    error,
    data,
    startPolling: startGamePolling,
    stopPolling: stopGamePolling,
    refetch: refetchGame,
  } = useQuery(GET_GAME, {
    variables: { gameId },
  });

  useEffect(() => {
    startGamePolling(2000);
    return stopGamePolling;
  }, [startGamePolling, stopGamePolling]);

  useEffect(() => {
    if (error) {
      stopGamePolling();
    }
  }, [error, stopGamePolling]);

  return { game: data?.game, loading, error, refetchGame, stopGamePolling };
};
