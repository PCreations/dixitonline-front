import React from 'react';
import { Segment } from 'semantic-ui-react';
import { useLobbyInfos } from './hooks/useLobbyInfos';

export const LobbyInfos = () => {
  const lobbyInfos = useLobbyInfos();

  return (
    <Segment>
      <p>{lobbyInfos.waitingGames} parties en attente de joueurs</p>
      <p>{lobbyInfos.connectedPlayers} joueurs connectés</p>
    </Segment>
  );
};
