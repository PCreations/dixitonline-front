import React, { useEffect, useState, useCallback } from 'react';
import { Box, Image, Stack, Input, Button } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

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
  const [createGame, { data, loading }] = useMutation(CREATE_GAME);
  const [gameIdToJoin, setGameIdToJoin] = useState('');
  const history = useHistory();
  const handleGameIdToJoinChange = useCallback((event) => setGameIdToJoin(event.target.value), [setGameIdToJoin]);
  const joinGame = useCallback(() => {
    const route = `/join/${gameIdToJoin}`;
    history.push(route);
  }, [history, gameIdToJoin]);
  useEffect(() => {
    if (data && data.gameCreateGame) {
      const route = `/game/${data.gameCreateGame.game.id}`;
      history.push(route);
    }
  }, [data, history]);
  return (
    <>
      <Box d="flex" justifyContent="center">
        <Image src="dixit.png" alt="dixit title"></Image>
      </Box>
      <Stack spacing={3}>
        <Box d="flex" justifyContent="center">
          <Input
            value={gameIdToJoin}
            onChange={handleGameIdToJoinChange}
            placeholder="rejoindre une partie"
            size="lg"
          />
          <Button size="lg" onClick={joinGame}>
            Rejoindre
          </Button>
        </Box>
        <Button leftIcon="add" onClick={createGame} isLoading={loading} loadingText="Création en cours...">
          Créer une partie
        </Button>
      </Stack>
    </>
  );
};
