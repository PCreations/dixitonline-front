import React, { useEffect, useContext } from 'react';
import gql from 'graphql-tag';
import { useParams, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/core';
import { I18nTranslateContext, I18nLanguageContext } from '../I18nContext';
import { Background } from './Background';

const JOIN_GAME = gql`
  mutation JoinGame($joinGameInput: GameJoinGameInput!) {
    gameJoinGame(joinGameInput: $joinGameInput) {
      __typename
      ... on GameJoinGameResultSuccess {
        game {
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
      }
      ... on GameJoinGameResultError {
        type
      }
    }
  }
`;

export const JoinGame = () => {
  const t = useContext(I18nTranslateContext);
  const { language } = useContext(I18nLanguageContext);
  const { gameId } = useParams();
  const history = useHistory();
  const [joinGame, { called, loading, error, data }] = useMutation(JOIN_GAME, {
    variables: { joinGameInput: { gameId } },
  });

  useEffect(() => {
    if (!called) {
      joinGame().then(({ data }) => {
        console.log('redirecting to game', data);
        debugger;
        history.push(`/${language}/game/${gameId}`);
      });
    }
  }, [called, joinGame, history, language, gameId]);

  if (loading) return 'Loading...';

  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>{t('error.oops')}</AlertTitle>
        <AlertDescription>{t('game.does-not-exist')}</AlertDescription>
      </Alert>
    );

  if (data?.gameJoinGame?.type === 'MAXIMUM_NUMBER_OF_PLAYERS_REACHED')
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>{t('error.oops')}</AlertTitle>
        <AlertDescription>{t('game.error-game-full')}</AlertDescription>
      </Alert>
    );

  return (
    <Background>
      <p>{t('game.accessing-game')}</p>
      <a href={`/${language}/game/${gameId}`}>{t('game.click-if-not-redirected')}</a>
    </Background>
  );
};
