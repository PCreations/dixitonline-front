import React, { useContext, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { AuthStateContext } from '../AuthContext';
import { Logo } from '../Logo';
import { GameSelection } from '../GameSelection';

const CREATE_GAME = gql`
  mutation {
    gameCreateGame {
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
  }
`;

export const Lobby = () => {
  const { currentUser } = useContext(AuthStateContext);
  const [createGame, { data, loading }] = useMutation(CREATE_GAME);
  const history = useHistory();

  const joinGame = useCallback(
    ({ code }) => {
      const route = `/join/${code}`;
      history.push(route);
    },
    [history]
  );

  useEffect(() => {
    if (data && data.gameCreateGame) {
      const route = `/game/${data.gameCreateGame.game.id}`;
      history.push(route);
    }
  }, [data, history]);

  return (
    <>
      <Logo />
      <GameSelection
        authenticatedUser={currentUser.username}
        onCreateNewGameClicked={createGame}
        onJoinGameSubmitted={joinGame}
        createNewGameLoading={loading}
      />
    </>
  );
};
