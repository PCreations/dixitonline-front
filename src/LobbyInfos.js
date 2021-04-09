import React from 'react';
import { List } from 'semantic-ui-react';
import { useLobbyInfos } from './hooks/useLobbyInfos';

export const LobbyInfos = () => {
  const lobbyInfos = useLobbyInfos();

  return (
    <List
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <List.Item icon="game" content={lobbyInfos.waitingGames} />
      <List.Item icon="users" content={lobbyInfos.connectedPlayers} />
    </List>
  );
};
