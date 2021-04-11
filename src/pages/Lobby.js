import React, { useContext, useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/core';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { firebaseApp } from '../firebase-app';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { AuthStateContext } from '../AuthContext';
import { Logo } from '../Logo';
import { Footer } from '../Footer';
import { GameSelection } from '../GameSelection';
import { I18nLanguageContext } from '../I18nContext';
import { EndingCondition } from '../GameConfigurationForm';
import { LobbyInfos } from '../LobbyInfos';

const GameFragment = gql`
  fragment Game on Game {
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
`;

const CREATE_GAME = gql`
  mutation {
    gameCreateGame {
      game {
        ...Game
      }
    }
  }
  ${GameFragment}
`;

const PLAY_NOW = gql`
  mutation {
    gamePlayNow {
      game {
        ...Game
      }
    }
  }
  ${GameFragment}
`;

const CREATE_GAME_WITH_X_TIMES_STORYTELLER_LIMIIT = gql`
  mutation GameCreateGame(
    $createGameWithXtimesStorytellerEndingConditionInput: GameCreateGameWithXtimesStorytellerEndingConditionInput!
  ) {
    gameCreateGameWithXtimesStorytellerEndingCondition(
      createGameWithXtimesStorytellerEndingConditionInput: $createGameWithXtimesStorytellerEndingConditionInput
    ) {
      __typename
      ... on GameCreateGameWithXtimesStorytellerEndingConditionResultSuccess {
        game {
          ...Game
        }
      }
      ... on GameCreateGameWithXtimesStorytellerEndingConditionResultError {
        type
      }
    }
  }
  ${GameFragment}
`;

const CREATE_GAME_WITH_SCORE_LIMIT = gql`
  mutation GameCreateGame(
    $createGameWithScoreLimitEndingConditionInput: GameCreateGameWithScoreLimitEndingConditionInput!
  ) {
    gameCreateGameWithScoreLimitEndingCondition(
      createGameWithScoreLimitEndingConditionInput: $createGameWithScoreLimitEndingConditionInput
    ) {
      __typename
      ... on GameCreateGameWithScoreLimitEndingConditionResultSuccess {
        game {
          ...Game
        }
      }
      ... on GameCreateGameWithScoreLimitEndingConditionResultError {
        type
      }
    }
  }
  ${GameFragment}
`;

export const Lobby = () => {
  const [createdGame, setCreatedGame] = useState();
  const [createdGameError, setCreatedGameError] = useState();
  const [playNowError, setPlayNowError] = useState();

  const { currentUser } = useContext(AuthStateContext);

  const { language } = useContext(I18nLanguageContext);
  const [createGame, { loading }] = useMutation(CREATE_GAME);
  const [createGameWithXtimesStorytellerLimit, xTimesStorytellerResult] = useMutation(
    CREATE_GAME_WITH_X_TIMES_STORYTELLER_LIMIIT
  );
  const [createGameWithScoreLimit, scoreLimitResult] = useMutation(CREATE_GAME_WITH_SCORE_LIMIT);
  const [playNow, { loading: playNowLoading }] = useMutation(PLAY_NOW);

  const history = useHistory();

  const gameCreationLoading = loading || xTimesStorytellerResult.loading || scoreLimitResult.loading;

  const joinGame = useCallback(
    ({ code }) => {
      firebaseApp.analytics().logEvent('join_game', {
        gameId: code,
        userId: currentUser.id,
        userUsername: currentUser.username,
      });
      const route = `/${language}/join/${code}`;
      history.push(route);
    },
    [language, currentUser, history]
  );

  const handlePlayNow = useCallback(() => {
    playNow().then(({ data, errors = [] }) => {
      if (errors.length > 0) {
        setPlayNowError(errors.map((e) => e.message).join('\n'));
        return;
      }
      const { game } = data.gamePlayNow;
      if (game.players.length === 0) {
        firebaseApp.analytics().logEvent('game_created', {
          userId: currentUser.id,
          userUsername: currentUser.username,
          endingCondition: EndingCondition.DEFAULT,
          isPublic: true,
        });
      } else {
        firebaseApp.analytics().logEvent('join_game', {
          gameId: game.id,
          userId: currentUser.id,
          userUsername: currentUser.username,
        });
      }
      const route = `/${language}/game/${game.id}`;
      history.push(route);
    });
  }, [setPlayNowError, currentUser, history, language, playNow]);

  const handleCreateNewGame = useCallback(
    ({ endingCondition, value }) => {
      firebaseApp.analytics().logEvent('game_created', {
        userId: currentUser.id,
        userUsername: currentUser.username,
        endingCondition,
        value,
        isPublic: false,
      });
      switch (endingCondition) {
        case EndingCondition.X_TIMES_STORYTELLER:
          createGameWithXtimesStorytellerLimit({
            variables: {
              createGameWithXtimesStorytellerEndingConditionInput: { timesBeingStoryteller: parseInt(value, 10) },
            },
          }).then(({ data, errors = [] }) => {
            if (errors.length > 0) {
              setCreatedGameError(errors.map((e) => e.message).join('\n'));
              return;
            }
            if (
              data.gameCreateGameWithXtimesStorytellerEndingCondition.__typename ===
              'GameCreateGameWithXtimesStorytellerEndingConditionResultSuccess'
            ) {
              setCreatedGame(data.gameCreateGameWithXtimesStorytellerEndingCondition.game);
            }
            setCreatedGameError(data.gameCreateGameWithXtimesStorytellerEndingCondition.type);
          });
          break;
        case EndingCondition.SCORE_LIMIT:
          createGameWithScoreLimit({
            variables: { createGameWithScoreLimitEndingConditionInput: { scoreLimit: parseInt(value, 10) } },
          }).then(({ data, errors = [] }) => {
            if (errors.length > 0) {
              setCreatedGameError(errors.map((e) => e.message).join('\n'));
              return;
            }
            if (
              data.gameCreateGameWithScoreLimitEndingCondition.__typename ===
              'GameCreateGameWithScoreLimitEndingConditionResultSuccess'
            ) {
              setCreatedGame(data.gameCreateGameWithScoreLimitEndingCondition.game);
            }
            setCreatedGameError(data.gameCreateGameWithScoreLimitEndingCondition.type);
          });
          break;
        case EndingCondition.DEFAULT:
        default:
          createGame().then(({ data, errors = [] }) => {
            if (errors.length > 0) {
              setCreatedGameError(errors.map((e) => e.message).join('\n'));
            } else {
              setCreatedGame(data.gameCreateGame.game);
            }
          });
      }
    },
    [
      currentUser,
      createGame,
      createGameWithXtimesStorytellerLimit,
      createGameWithScoreLimit,
      setCreatedGame,
      setCreatedGameError,
    ]
  );

  useEffect(() => {
    if (createdGame) {
      const route = `/${language}/game/${createdGame.id}`;
      history.push(route);
    }
  }, [language, createdGame, history]);

  return (
    <>
      <Logo />
      {createdGameError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Impossible de créer la partie</AlertTitle>
          <AlertDescription>{createdGameError}</AlertDescription>
        </Alert>
      )}
      {playNowError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Something went wrong :(</AlertTitle>
          <AlertDescription>{playNowError}</AlertDescription>
        </Alert>
      )}
      <LanguageSwitcher />
      <LobbyInfos />
      <GameSelection
        authenticatedUser={currentUser.username}
        onPlayNowClicked={handlePlayNow}
        playNowLoading={playNowLoading}
        onCreateNewGameClicked={handleCreateNewGame}
        onJoinGameSubmitted={joinGame}
        createNewGameLoading={gameCreationLoading && !createdGameError}
      />
      <Footer />
    </>
  );
};
