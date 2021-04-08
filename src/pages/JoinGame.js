import React, { useEffect, useContext } from 'react';
import gql from 'graphql-tag';
import { useParams, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/core';
import { I18nTranslateContext, I18nLanguageContext } from '../I18nContext';

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
  const t = useContext(I18nTranslateContext);
  const { language } = useContext(I18nLanguageContext);
  const { gameId } = useParams();
  const history = useHistory();
  const [joinGame, { error, data, loading }] = useMutation(JOIN_GAME, { variables: { joinGameInput: { gameId } } });

  useEffect(() => {
    joinGame();
  }, [joinGame]);

  useEffect(() => {
    if (data?.gameJoinGame.__typename === 'GameJoinGameResultSuccess') {
      console.log('Join game success, redirecting to game');
      debugger;
      history.push(`/${language}/game/${gameId}`);
    }
  }, [language, data, gameId, history]);

  useEffect(() => {
    if (data?.gameJoinGame.__typename === 'GameJoinGameResultError') {
      if (data.gameJoinGame.type === 'GAME_ALREADY_JOINED') {
        console.log('Game already joined, redirecting to game');
        history.push(`/${language}/game/${gameId}`);
      }
    }
  }, [language, data, history, gameId]);

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
    <div>
      <p>{t('game.accessing-game')}</p>
      <a href={`/${language}/game/${gameId}`}>{t('game.click-if-not-redirected')}</a>
    </div>
  );
};
