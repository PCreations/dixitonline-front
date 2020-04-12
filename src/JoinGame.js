import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useParams, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

const JOIN_GAME = gql`
  mutation JoinGame($joinGameInput: GameJoinGameInput!) {
    gameJoinGame(joinGameInput: $joinGameInput) {
      __typename
      ... on GameJoinGameResultSuccess {
        game {
          id
          host {
            id
            name
          }
          players {
            id
            name
          }
        }
      }
      ... on GameJoinGameResultError {
        type
      }
    }
  }
`;

export const JoinGame = () => {
  const { gameId } = useParams();
  const history = useHistory();
  const [joinGame, { data, loading }] = useMutation(JOIN_GAME, { variables: { joinGameInput: { gameId } } });
  useEffect(() => {
    joinGame();
    if (data?.gameJoinGame.__typename === 'GameJoinGameResultSuccess') {
      history.push(`/game/${gameId}`);
    }
  }, [joinGame, data, history, gameId]);

  if (loading) return 'Loading...';

  if (data?.gameJoinGame.__typename === 'GameJoinGameResultError') {
    return data.gameJoinGame.type;
  }

  return 'Accès au jeu...';
};
