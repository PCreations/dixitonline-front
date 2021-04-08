import React from 'react';
import { Segment } from 'semantic-ui-react';
import { useLobbyInfos } from './hooks/useLobbyInfos';

export const LobbyInfos = () => {
  const lobbyInfos = useLobbyInfos();

  return (
    <Segment textAlign="center" basic>
      <p>{lobbyInfos.waitingGames}</p>
      <p>{lobbyInfos.connectedPlayers}</p>
    </Segment>
  );
};
