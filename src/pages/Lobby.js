import React, { useContext, useEffect, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Segment, Flag } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { firebaseApp } from '../firebase-app';
import { AuthStateContext } from '../AuthContext';
import { Logo } from '../Logo';
import { Footer } from '../Footer';
import { GameSelection } from '../GameSelection';
import { I18nLanguageContext } from '../I18nContext';

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
  const { language } = useContext(I18nLanguageContext);
  const [createGame, { data, loading }] = useMutation(CREATE_GAME);
  const history = useHistory();

  const joinGame = useCallback(
    ({ code }) => {
      firebaseApp.analytics().logEvent('join_game', {
        gameId: code,
        userId: currentUser.id,
        userUsername: currentUser.username,
      });
      const route = `/${language}/join/${code}`;
      debugger;
      history.push(route);
    },
    [language, currentUser, history]
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
      const route = `/${language}/game/${data.gameCreateGame.game.id}`;
      history.push(route);
    }
  }, [language, data, history]);

  return (
    <>
      <Logo />
      <Segment basic textAlign="center">
        {language === 'fr' ? (
          <Link to="/en/">
            <Flag name="gb" />
          </Link>
        ) : (
          <Link to="/fr/">
            <Flag name="fr" />
          </Link>
        )}
      </Segment>
      <GameSelection
        authenticatedUser={currentUser.username}
        onCreateNewGameClicked={handleCreateNewGame}
        onJoinGameSubmitted={joinGame}
        createNewGameLoading={loading}
      />
      <Footer />
    </>
  );
};
