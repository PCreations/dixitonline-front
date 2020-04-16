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
  }, [joinGame]);

  useEffect(() => {
    if (data?.gameJoinGame.__typename === 'GameJoinGameResultSuccess') {
      history.push(`/game/${gameId}`);
    }
  }, [data, gameId, history]);

  useEffect(() => {
    if (data?.gameJoinGame.__typename === 'GameJoinGameResultError') {
      if (data.gameJoinGame.type === 'GAME_ALREADY_JOINED') {
        history.push(`/game/${gameId}`);
      }
    }
  }, [data, history, gameId]);

  if (loading) return 'Loading...';

  return (
    <div>
      <p>Accès au jeu...</p>
      <a href={`/game/${gameId}`}>Cliquez ici si vous n'êtes pas redirigé</a>
    </div>
  );
};
