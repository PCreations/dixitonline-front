import React, { useContext, useEffect, useCallback } from 'react';
import gql from 'graphql-tag';
import { useParams, useHistory } from 'react-router-dom';
import { Placeholder, Segment } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Alert, AlertIcon, AlertTitle, AlertDescription, Flex } from '@chakra-ui/core';
import { GameWaitingForPlayers } from '../GameWaitingForPlayers';
import { GameEnded as BaseGameEnded } from '../GameEnded';
import { PlayersPanel } from '../PlayersPanel';
import { AuthStateContext } from '../AuthContext';
import { Logo } from '../Logo';
import { StorytellerPhase } from '../turn-phases/StorytellerPhase';
import { PlayersCardChoicePhase } from '../turn-phases/PlayersCardChoicePhase';
import { ScoringPhase } from '../turn-phases/ScoringPhase';
import { VotingPhase } from '../turn-phases/VotingPhase';
import { PhaseFragment } from '../turn-phases/phase-fragment';
import { Error } from '../Error';

const Loading = () => (
  <Placeholder>
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
  </Placeholder>
);

const GameFragment = gql`
  fragment Game on Game {
    id
    currentTurnId
    remainingTurns
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
`;

const GET_GAME = gql`
  query GetGame($gameId: ID!) {
    game(gameId: $gameId) {
      ...Game
    }
  }
  ${GameFragment}
`;

const START_GAME = gql`
  mutation GameStartGame($startGameInput: GameStartGameInput!) {
    gameStartGame(startGameInput: $startGameInput) {
      __typename
      ... on GameStartGameResultError {
        type
      }
      ... on GameStartGameResultSuccess {
        game {
          ...Game
        }
      }
    }
  }
  ${GameFragment}
`;

const GET_TURN_PHASE = gql`
  query GetTurnPhase($turnId: ID!) {
    getTurnPhase(turnId: $turnId) {
      ...Phase
    }
  }
  ${PhaseFragment}
`;

const GameNotStarted = ({ game }) => {
  const [startGame, { data: startGameData, error: startGameError, loading: startGameLoading }] = useMutation(
    START_GAME,
    {
      variables: { startGameInput: { gameId: game.id } },
    }
  );
  const { currentUser } = useContext(AuthStateContext);

  const startGameErrorMessage = startGameError || startGameData?.gameStartGame.type;

  return (
    <Flex direction="column">
      <Logo />
      {startGameErrorMessage && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Impossible de lancer la partie :( </AlertTitle>
          <AlertDescription>{startGameErrorMessage}</AlertDescription>
        </Alert>
      )}
      <GameWaitingForPlayers
        gameId={game.id}
        players={game.players}
        isHost={game.host.id === currentUser.id}
        onStartGameClicked={startGame}
        startGameIsLoading={startGameLoading}
      />
    </Flex>
  );
};

const GameEnded = ({ players }) => {
  return (
    <Flex direction="column">
      <Logo />
      <BaseGameEnded players={players} />
    </Flex>
  );
};

const GameInProgress = ({ totalPlayerScoreById, turnId, refetchGame, remainingTurns }) => {
  console.log('current turn id', turnId);
  const {
    loading,
    error,
    data,
    startPolling: startPhasePolling,
    stopPolling: stopPhasePolling,
  } = useQuery(GET_TURN_PHASE, { variables: { turnId }, fetchPolicy: 'network-only' });

  useEffect(() => {
    console.log('Start phase polling', turnId);
    startPhasePolling(2000);
    return () => {
      console.log('Stop phase polling', turnId);
      stopPhasePolling();
    };
  }, [turnId, startPhasePolling, stopPhasePolling]);

  const handleReadyForNextTurn = useCallback(() => {
    refetchGame();
  }, [refetchGame]);

  const { currentUser } = useContext(AuthStateContext);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    console.error(error);
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Une erreur est survenue :(</AlertTitle>
        <AlertDescription>Essayez de rafraîchir la page</AlertDescription>
      </Alert>
    );
  }
  console.log('phase', data.getTurnPhase);
  const players = data.getTurnPhase.players.map((player) => ({
    id: player.id,
    username: player.name,
    isStoryteller: player.id === data.getTurnPhase.storytellerId,
    score: totalPlayerScoreById[player.id] + player.score,
    isReady: player.readyForNextPhase,
  }));
  const storyteller = players.find((p) => p.isStoryteller);
  const isStoryteller = currentUser.id === data.getTurnPhase.storytellerId;
  const currentPlayer = players.find((p) => p.id === currentUser.id);
  return (
    <Flex direction="column">
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
        {remainingTurns === 0 ? (
          <span>Dernier tour !</span>
        ) : (
          <span>
            Tours restants : <strong>{remainingTurns + 1}</strong>
          </span>
        )}
      </Segment>
      {(() => {
        switch (data.getTurnPhase.name) {
          case 'STORYTELLER':
            return <StorytellerPhase turnId={turnId} isStoryteller={isStoryteller} cards={data.getTurnPhase.hand} />;
          case 'PLAYERS_CARD_CHOICE':
            return (
              <PlayersCardChoicePhase
                turnId={turnId}
                cards={data.getTurnPhase.hand}
                clue={data.getTurnPhase.clue}
                storytellerUsername={storyteller.username}
                isStoryteller={isStoryteller}
                hasPlayed={currentPlayer.isReady}
              />
            );
          case 'PLAYERS_VOTING':
            return (
              <VotingPhase
                turnId={turnId}
                board={data.getTurnPhase.board.map(({ card }) => ({ id: card.id, src: card.url }))}
                cards={data.getTurnPhase.hand}
                clue={data.getTurnPhase.clue}
                storytellerUsername={storyteller.username}
                isStoryteller={isStoryteller}
                hasPlayed={currentPlayer.isReady}
              />
            );
          case 'SCORING':
            console.log(data.getTurnPhase.players);
            return (
              <ScoringPhase
                cards={data.getTurnPhase.board.map(({ card, playerId, votes }) => ({
                  id: card.id,
                  src: card.url,
                  ownedByStoryteller: playerId === storyteller.id,
                  votes: votes.map((p) => p.name),
                  username: players.find((p) => p.id === playerId).username,
                  score: data.getTurnPhase.players.find((p) => p.id === playerId).score,
                }))}
                clue={data.getTurnPhase.clue}
                storytellerUsername={storyteller.username}
                isStoryteller={isStoryteller}
                isLastTurn={remainingTurns === 0}
                onReadyForNextTurn={handleReadyForNextTurn}
              />
            );
          default:
            return <Error title="Oups..." message="Il va falloir punir le développeur..."></Error>;
        }
      })()}
    </Flex>
  );
};

const playerNotInGame = (playerId, players) => !players.some(({ id }) => id === playerId);

export const Game = () => {
  const history = useHistory();
  const { gameId } = useParams();
  const {
    loading,
    error,
    data,
    startPolling: startGamePolling,
    stopPolling: stopGamePolling,
    refetch: refetchGame,
  } = useQuery(GET_GAME, {
    variables: { gameId },
  });

  useEffect(() => {
    startGamePolling(2000);
    return stopGamePolling;
  }, []);

  const { currentUser } = useContext(AuthStateContext);

  if (error) {
    stopGamePolling();
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Une erreur est survenue :(</AlertTitle>
        <AlertDescription>
          {error.message.includes('not found')
            ? "Aucune partie n'existe pour ce code !"
            : 'Essayez de rafraîchir la page'}
        </AlertDescription>
      </Alert>
    );
  }

  if (loading) {
    return <Loading />;
  }

  if (playerNotInGame(currentUser.id, data.game.players)) {
    if (data.game.status !== 'WAITING_FOR_PLAYERS') {
      stopGamePolling();
      return (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Oups !</AlertTitle>
          <AlertDescription>Vous n'êtes pas dans cette partie</AlertDescription>
        </Alert>
      );
    }
    history.push(`/join/${data.game.id}`);
  }

  switch (data.game.status) {
    case 'WAITING_FOR_PLAYERS':
      return <GameNotStarted game={data.game} />;
    case 'STARTED': {
      const totalPlayerScoreById = data.game.players.reduce(
        (scores, player) => ({
          ...scores,
          [player.id]: player.score,
        }),
        {}
      );
      if (data.game.currentTurnId) {
        stopGamePolling();
      }
      return data.game.currentTurnId ? (
        <GameInProgress
          totalPlayerScoreById={totalPlayerScoreById}
          turnId={data.game.currentTurnId}
          refetchGame={refetchGame}
          remainingTurns={data.game.remainingTurns}
        />
      ) : (
        <Loading />
      );
    }
    case 'ENDED':
      stopGamePolling();
      return <GameEnded players={data.game.players} />;
    default:
      return (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Une erreur est survenue :(</AlertTitle>
          <AlertDescription>Essayez de rafraîchir la page</AlertDescription>
        </Alert>
      );
  }
};
