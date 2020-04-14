import React, { useContext, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { firebaseApp } from '../firebase-app';
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
      firebaseApp.analytics().logEvent('join_game', {
        gameId: code,
        userId: currentUser.id,
        userUsername: currentUser.username,
      });
      const route = `/join/${code}`;
      history.push(route);
    },
    [currentUser, history]
  );

  const handleCreateNewGame = useCallback(() => {
    firebaseApp.analytics().logEvent('game_created', {
      userId: currentUser.id,
      userUsername: currentUser.username,
    });
    createGame();
  }, [currentUser, createGame]);

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
        onCreateNewGameClicked={handleCreateNewGame}
        onJoinGameSubmitted={joinGame}
        createNewGameLoading={loading}
      />
    </>
  );
};
