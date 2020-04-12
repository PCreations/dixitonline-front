import React from 'react';
import { Stack, Box } from '@chakra-ui/core';

export const GamePlayers = ({ players }) => (
  <Stack spacing={8} maxW={200}>
    {players.map((player) => (
      <Box key={player.id}>
        <Stack isInline spacing={8} align="center">
          <Box>{player.score}</Box>
          <Box>{player.name}</Box>
        </Stack>
      </Box>
    ))}
  </Stack>
);
