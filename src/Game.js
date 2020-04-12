import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Alert, AlertIcon, AlertTitle, AlertDescription, Flex, Stack, Button, Box, Text } from '@chakra-ui/core';
import { GamePlayers } from './GamePlayers';
import { AuthContext } from './AuthContext';

const GameFragment = gql`
  fragment Game on Game {
    id
    currentTurnId
    status
    host {
      id
      name
    }
    players {
      id
      name
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

const playerNotInGame = (username, players) => !players.some(({ name }) => name === username);

export const Game = () => {
  const { gameId } = useParams();
  const { loading, error, data } = useQuery(GET_GAME, { variables: { gameId } });
  const [startGame, { data: startGameData, error: startGameError, loading: startGameLoading }] = useMutation(
    START_GAME,
    {
      variables: { startGameInput: { gameId } },
    }
  );
  const { username } = useContext(AuthContext);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if (data && playerNotInGame(username, data.game.players)) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Oups !</AlertTitle>
        <AlertDescription>Vous n'êtes pas dans cette partie</AlertDescription>
      </Alert>
    );
  }

  const startGameErrorMessage = startGameError || startGameData?.gameStartGame.type;

  return (
    <Flex>
      <GamePlayers players={data.game.players} />
      {data.game.status === 'WAITING_FOR_PLAYERS' ? (
        <Stack spacing={8}>
          {startGameErrorMessage ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Impossible de lancer la partie :( </AlertTitle>
              <AlertDescription>{startGameErrorMessage}</AlertDescription>
            </Alert>
          ) : (
            <Alert status="info">
              <AlertIcon />
              <AlertDescription>En attente de joueurs...</AlertDescription>
            </Alert>
          )}
          <Box>
            <Text fontSize="3xl">
              Code la partie : <strong>{data.game.id}</strong>
            </Text>
          </Box>
          {username === data.game.host.name && data.game.players.length > 2 && (
            <Button
              leftIcon="check-circle"
              onClick={startGame}
              isLoading={startGameLoading}
              loadingText="Lancement de la partie..."
            >
              Démarrer la partie
            </Button>
          )}
        </Stack>
      ) : null}
    </Flex>
  );
};
