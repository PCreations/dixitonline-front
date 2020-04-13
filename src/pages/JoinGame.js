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
    if (data?.gameJoinGame.__typename === 'GameJoinGameResultSuccess') {
      history.push(`/game/${gameId}`);
    }
  }, []);

  if (loading) return 'Loading...';

  console.log(data);
  if (data?.gameJoinGame.__typename === 'GameJoinGameResultError') {
    if (data.gameJoinGame.type === 'GAME_ALREADY_JOINED') {
      history.push(`/game/${gameId}`);
    }
    return data.gameJoinGame.type;
  }

  return (
    <div>
      <p>Accès au jeu...</p>
      <a href={`/game/${gameId}`}>Cliquez ici si vous n'êtes pas redirigé</a>
    </div>
  );
};
