import { useContext, useEffect, useCallback, useReducer, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { firebaseApp } from '../firebase-app';
import { useLazyQuery, useMutation } from '@apollo/client';
import { AuthStateContext } from '../AuthContext';
import { PhaseFragment } from '../turn-phases/phase-fragment';

const GameFragment = gql`
  fragment Game on Game {
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

const defaultState = {
  game: {
    error: null,
    loading: false,
    data: null,
  },
  phase: {
    error: null,
    loading: false,
    data: null,
  },
  shouldPollGame: true,
  shouldPollPhase: false,
};

const gameReducer = (game = defaultState.game, action) => {
  switch (action.type) {
    case 'game/fetched':
      return {
        ...action.payload,
        loading: game.data ? false : action.payload.loading,
      };
    default:
      return game;
  }
};

const phaseReducer = (phase = defaultState.phase, action) => {
  switch (action.type) {
    case 'phase/fetched':
      return {
        ...action.payload,
        loading: phase.data ? false : action.payload.loading,
      };
    default:
      return phase;
  }
};

const shouldPollGameReducer = (shouldPollGame = defaultState.shouldPollGame, action) => {
  switch (action.type) {
    case 'game/fetched':
      return (
        ['WAITING_FOR_PLAYERS', 'ENDED'].includes(action.payload.data?.status) ||
        action.payload.data?.currentTurnId == null
      );
    default:
      return shouldPollGame;
  }
};

const shouldPollPhaseReducer = (shouldPollPhase = defaultState.shouldPollPhase, action) => {
  switch (action.type) {
    case 'game/fetched': {
      const game = action.payload.data;
      if (!game) return shouldPollPhase;

      if (game.status === 'STARTED') {
        console.log('shouldPollPhaseReducer', game.currentTurnId, game.currentTurnId !== null);
        return game.currentTurnId !== null;
      }
      return false;
    }
    default:
      return shouldPollPhase;
  }
};

const reducer = (state = defaultState, action) => ({
  game: gameReducer(state.game, action),
  phase: phaseReducer(state.phase, action),
  shouldPollGame: shouldPollGameReducer(state.shouldPollGame, action),
  shouldPollPhase: shouldPollPhaseReducer(state.shouldPollPhase, action),
});

const useGamePolling = ({ gameId, setGame }) => {
  const [fetchGame, { called, loading, refetch, startPolling, stopPolling, error, data }] = useLazyQuery(GET_GAME, {
    variables: { gameId },
    pollInterval: 2000,
  });

  const [shouldPoll, setShouldPoll] = useState(false);

  const refetchGame = useCallback(() => {
    refetch().then(({ loading, error, data }) => {
      setGame({
        loading,
        error,
        data: data?.game,
      });
    });
  }, [refetch, setGame]);

  useEffect(() => {
    let didCancel = false;
    if (shouldPoll) {
      if (!called) fetchGame();
      if (startPolling) startPolling(2000);
    }

    if (!didCancel) {
      setGame({
        loading,
        error,
        data: data?.game,
      });
    }

    return () => {
      didCancel = true;
      if (stopPolling) stopPolling();
    };
  }, [called, data, error, loading, fetchGame, setGame, shouldPoll, startPolling, stopPolling]);

  const startGamePolling = useCallback(() => {
    setShouldPoll(true);
  }, [setShouldPoll]);

  const stopGamePolling = useCallback(() => {
    setShouldPoll(false);
  }, [setShouldPoll]);

  return { refetchGame, startGamePolling, stopGamePolling: stopGamePolling };
};

const usePhasePolling = ({ turnId, setPhase }) => {
  const { currentUser } = useContext(AuthStateContext);
  const [stopObservingPhase = () => {}, setStopObervingPhase] = useState();
  const startObservingPhase = useCallback(() => {
    const playerId = currentUser.id;
    // TODO : use game-player-id for phase view id
    console.log("PHASE TURN VIEW ID", `${turnId}-${playerId}`)
    
    const phaseViewDoc = firebaseApp.firestore().collection('turn-phase-views').doc(`${turnId}-${playerId}`);
    
    const unsub = phaseViewDoc.onSnapshot({ includeMetadataChanges: true }, (docSnapshot) => {
      
      const phase = docSnapshot.data();
      
      const phaseState = {
        id: phase.id,
        name: phase.type,
        storytellerId: phase.storytellerId,
        board: (phase.board || []).map(({ playerId, votes, ...card }) => ({
          card,
          playerId: playerId ?? null,
          votes: votes ?? [],
        })),
        clue: phase.clue || '',
        hand: phase.hand,
        players: phase.players.map((player) => ({
          ...player,
          score: player.score || 0,
        })),
      };
      setPhase({
        loading: false,
        error: undefined,
        data: phaseState,
      });
    }, console.error);

    setStopObervingPhase(() => {
      return unsub
    });
  }, [currentUser.id, setPhase, turnId]);

  return { startPhasePolling: startObservingPhase, stopPhasePolling: stopObservingPhase };
};

const useStartGame = ({ gameId, setGame, resetPhase }) => {
  const [doStartGame, { data, error, loading, called }] = useMutation(START_GAME, {
    variables: { startGameInput: { gameId } },
  });
  const { currentUser } = useContext(AuthStateContext);

  const startGameErrorMessage = error || data?.gameStartGame.type;

  const startGame = useCallback(() => {
    firebaseApp.analytics().logEvent('game_started', {
      userId: currentUser.id,
      gameId,
    });
    resetPhase();
    doStartGame();
  }, [doStartGame, gameId, resetPhase, currentUser]);

  useEffect(() => {
    if (called) {
      setGame({ loading, data: data?.gameStartGame.game, error: startGameErrorMessage });
    }
  }, [called, setGame, loading, data, startGameErrorMessage]);

  return {
    startGame,
    startGameLoading: loading,
  };
};

export const useGameState = ({ gameId }) => {
  const subscribed = useRef(false);
  const [state, dispatch] = useReducer(reducer, defaultState);
  const setGame = useCallback(
    (payload) =>
      dispatch({
        type: 'game/fetched',
        payload,
      }),
    [dispatch]
  );
  const setPhase = useCallback(
    (payload) =>
      dispatch({
        type: 'phase/fetched',
        payload,
      }),
    [dispatch]
  );
  const resetPhase = useCallback(
    () =>
      dispatch({
        type: 'phase/fetched',
        payload: {
          ...state.phase,
          data: undefined,
        },
      }),
    [dispatch, state.phase]
  );
  const turnId = state.game.data?.currentTurnId;

  const gamePolling = useGamePolling({ gameId, setGame });
  const phasePolling = usePhasePolling({ turnId, setPhase });
  const { startGame, startGameLoading } = useStartGame({ gameId, setGame, resetPhase });

  useEffect(() => {
    if (state.shouldPollGame) {
      if (!state.game.loading) {
        gamePolling.startGamePolling();
      }

      return gamePolling.stopGamePolling;
    }
    gamePolling.stopGamePolling();
  }, [state.shouldPollGame, state.game.loading, state.game.data, gamePolling]);

  useEffect(() => {
    if (state.shouldPollPhase && !subscribed.current) {
      if (!state.phase.loading) {
        phasePolling.startPhasePolling();
        subscribed.current = true;
      }
      // return phasePolling.stopPhasePolling;
    }
    
    if (!state.shouldPollPhase) {
      phasePolling.stopPhasePolling();
      subscribed.current = false;
    }

    // return phasePolling.stopPhasePolling;
  }, [state, phasePolling]);

  return {
    game: state.game,
    phase: state.phase,
    refetchGame: gamePolling.refetchGame,
    startGame,
    startGameLoading,
  };
};
