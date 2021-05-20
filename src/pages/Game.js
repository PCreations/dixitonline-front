import React, { useContext, useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Placeholder, Segment } from 'semantic-ui-react';
import { Alert, AlertIcon, AlertTitle, AlertDescription, Flex, useColorMode } from '@chakra-ui/core';
import { GameWaitingForPlayers } from '../GameWaitingForPlayers';
import { GameEnded as BaseGameEnded } from '../GameEnded';
import { PlayersPanel } from '../PlayersPanel';
import { AuthStateContext } from '../AuthContext';
import { Logo } from '../Logo';
import { StorytellerPhase } from '../turn-phases/StorytellerPhase';
import { PlayersCardChoicePhase } from '../turn-phases/PlayersCardChoicePhase';
import { ScoringPhase } from '../turn-phases/ScoringPhase';
import { VotingPhase } from '../turn-phases/VotingPhase';
import { Error } from '../Error';
import { I18nTranslateContext, I18nLanguageContext } from '../I18nContext';
import { ChatRoom } from '../ChatRoom';
import { Background } from './Background';
import { useColors } from '../hooks/useColors';
import { useGameState } from '../hooks/useGameState';

const Loading = () => {
  const { colorMode } = useColorMode();
  return (
    <Placeholder inverted={colorMode === 'dark'} fluid>
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder>
  );
};

const GameNotStarted = ({ game, startGame }) => {
  const t = useContext(I18nTranslateContext);
  const { currentUser } = useContext(AuthStateContext);
  return (
    <Background>
      <Flex direction="column">
        <Logo />
        {game.error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>{t('game.cant-start-game')}</AlertTitle>
            <AlertDescription>{game.error}</AlertDescription>
          </Alert>
        )}
        <GameWaitingForPlayers
          gameId={game.data.id}
          players={game.data.players}
          isHost={game.data.host.id === currentUser.id}
          onStartGameClicked={startGame}
          startGameIsLoading={game.loading}
        />
      </Flex>
    </Background>
  );
};

const GameEnded = (gameEndedProps) => {
  return (
    <Flex direction="column">
      <Logo />
      <BaseGameEnded {...gameEndedProps} />
    </Flex>
  );
};

const GameInProgress = ({ gameId, hostId, totalPlayerScoreById, turnId, phase, refetchGame, endCondition }) => {
  const t = useContext(I18nTranslateContext);
  const { color } = useColors();

  const handleReadyForNextTurn = useCallback(() => {
    refetchGame();
  }, [refetchGame]);

  const { currentUser } = useContext(AuthStateContext);
  if (phase.loading || !phase.data) {
    return <Loading />;
  }
  if (phase.error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>{t('an-error-has-occured')}</AlertTitle>
        <AlertDescription>{t('refresh-page')}</AlertDescription>
      </Alert>
    );
  }

  const players = phase.data.players.map((player) => ({
    id: player.id,
    username: player.name,
    isStoryteller: player.id === phase.data.storytellerId,
    score: totalPlayerScoreById[player.id] + player.score,
    isReady: player.readyForNextPhase,
  }));
  const storyteller = players.find((p) => p.isStoryteller);
  const isStoryteller = currentUser.id === phase.data.storytellerId;
  const currentPlayer = players.find((p) => p.id === currentUser.id);
  const isLastTurn =
    (endCondition.__typename === 'GameRemainingTurnsEndCondition' && endCondition.remainingTurns === 0) ||
    (endCondition.__typename === 'GameScoreLimitEndCondition' &&
      players.some(({ score }) => score >= endCondition.scoreLimit));

  return (
    <Flex direction="column" color={color}>
      <PlayersPanel players={players} authenticatedPlayerId={currentUser.id} />
      <Segment
        basic
        textAlign="left"
        style={{
          marginTop: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        <EndCondition endCondition={endCondition} />
      </Segment>
      {(() => {
        switch (phase.data.name) {
          case 'STORYTELLER':
            return <StorytellerPhase turnId={turnId} isStoryteller={isStoryteller} cards={phase.data.hand} />;
          case 'PLAYERS_CARD_CHOICE':
            return (
              <PlayersCardChoicePhase
                turnId={turnId}
                cards={phase.data.hand}
                clue={phase.data.clue}
                storytellerUsername={storyteller.username}
                isStoryteller={isStoryteller}
                hasPlayed={currentPlayer.isReady}
                threePlayersMode={players.length === 3}
              />
            );
          case 'PLAYERS_VOTING':
            return (
              <VotingPhase
                turnId={turnId}
                board={phase.data.board.map(({ card }) => ({ id: card.id, src: card.url }))}
                cards={phase.data.hand}
                clue={phase.data.clue}
                storytellerUsername={storyteller.username}
                isStoryteller={isStoryteller}
                hasPlayed={currentPlayer.isReady}
              />
            );
          case 'SCORING':
            return (
              <ScoringPhase
                gameId={gameId}
                hostId={hostId}
                cards={phase.data.board.map(({ card, playerId, votes }) => ({
                  id: card.id,
                  src: card.url,
                  ownedByStoryteller: playerId === storyteller.id,
                  votes: votes.map((p) => p.name),
                  username: players.find((p) => p.id === playerId).username,
                  score: phase.data.players.find((p) => p.id === playerId).score,
                }))}
                clue={phase.data.clue}
                storytellerUsername={storyteller.username}
                isStoryteller={isStoryteller}
                isLastTurn={isLastTurn}
                onReadyForNextTurn={handleReadyForNextTurn}
              />
            );
          default:
            return <Error title={t('error.oops')} message={t('error.punish-me')}></Error>;
        }
      })()}
    </Flex>
  );
};

const EndCondition = ({ endCondition }) => {
  const t = useContext(I18nTranslateContext);
  if (endCondition.__typename === 'GameRemainingTurnsEndCondition') {
    return endCondition.remainingTurns === 0 ? (
      <span>{t('game.last-turn')}</span>
    ) : (
      <span>
        <strong>
          {t('game.remaining-turns')}
          {endCondition.remainingTurns + 1}
        </strong>
      </span>
    );
  }
  return (
    <span>
      Premier joueur à arriver à <strong>{endCondition.scoreLimit} points</strong>
    </span>
  );
};

const playerNotInGame = (playerId, players) => !players.some(({ id }) => id === playerId);

export const Game = () => {
  const t = useContext(I18nTranslateContext);
  const history = useHistory();
  const { gameId } = useParams();
  const { language } = useContext(I18nLanguageContext);
  const { game, phase, refetchGame, startGame, startGameLoading } = useGameState({ gameId });

  const getGameComponent = () => {
    if (game.loading || !game.data) {
      return <Loading />;
    }
    switch (game.data.status) {
      case 'WAITING_FOR_PLAYERS':
        return <GameNotStarted game={game} startGame={startGame} />;
      case 'STARTED': {
        const totalPlayerScoreById = game.data.players.reduce(
          (scores, player) => ({
            ...scores,
            [player.id]: player.score,
          }),
          {}
        );

        return game.data.currentTurnId && phase.data ? (
          <GameInProgress
            gameId={game.data.id}
            hostId={game.data.host.id}
            totalPlayerScoreById={totalPlayerScoreById}
            turnId={game.data.currentTurnId}
            phase={phase}
            refetchGame={refetchGame}
            endCondition={game.data.endCondition}
          />
        ) : (
          <Loading />
        );
      }
      case 'ENDED':
        return (
          <GameEnded
            players={game.data.players}
            gameId={game.data.id}
            hostId={game.data.host.id}
            restartGameLoading={startGameLoading}
            restartGame={startGame}
          />
        );
      default:
        return (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>{t('an-error-has-occured')}</AlertTitle>
            <AlertDescription>{t('refresh-page')}</AlertDescription>
          </Alert>
        );
    }
  };

  const { currentUser } = useContext(AuthStateContext);

  useEffect(() => {
    if (game.data) {
      const isNotInGame = playerNotInGame(currentUser.id, game.data.players);
      console.log(game);
      debugger;
      if (isNotInGame && game.data.status === 'WAITING_FOR_PLAYERS') {
        console.log('redirecting to join');
        history.push(`/${language}/join/${game.data.id}`);
      }
    }
  }, [language, game, currentUser, history]);

  if (game.error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>{t('an-error-has-occured')}</AlertTitle>
        <AlertDescription>
          {game.error?.message.includes('not found') ? t('game.does-not-exist') : t('refresh-page')}
        </AlertDescription>
      </Alert>
    );
  }

  if (game.data && playerNotInGame(currentUser.id, game.data.players) && game.data.status !== 'WAITING_FOR_PLAYERS') {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>{t('error.oops')}</AlertTitle>
        <AlertDescription>{t('game.error-not-in-game')}</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      {game.data && <ChatRoom gameId={game.data.id} username={currentUser.username} userId={currentUser.id} />}
      {getGameComponent()}
    </>
  );
};
