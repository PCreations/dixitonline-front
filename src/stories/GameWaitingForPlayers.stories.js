import React from 'react';
import { action } from '@storybook/addon-actions';
import { GameWaitingForPlayers } from '../GameWaitingForPlayers';

export default { title: 'GameWaitingForPlayers' };

export const withSomePlayers = () => (
  <GameWaitingForPlayers
    gameId="GXSZRF"
    players={[
      {
        id: '1',
        username: 'Anthow',
      },
      {
        id: '2',
        username: 'Mike',
      },
      {
        id: '3',
        username: 'Jaz',
      },
    ]}
  />
);

export const asHostWhenEnoughPlayers = () => (
  <GameWaitingForPlayers
    gameId="GXSZRF"
    players={[
      {
        id: '1',
        username: 'Anthow',
      },
      {
        id: '2',
        username: 'Mike',
      },
      {
        id: '3',
        username: 'Jaz',
      },
      {
        id: '4',
        username: 'Pierre',
      },
    ]}
    isHost
    onStartGameClicked={action('start-game-clicked')}
  />
);

export const asPlayerWhenEnoughPlayers = () => (
  <GameWaitingForPlayers
    gameId="GXSZRF"
    players={[
      {
        id: '1',
        username: 'Anthow',
      },
      {
        id: '2',
        username: 'Mike',
      },
      {
        id: '3',
        username: 'Jaz',
      },
      {
        id: '4',
        username: 'Pierre',
      },
    ]}
    onStartGameClicked={action('start-game-clicked')}
  />
);
