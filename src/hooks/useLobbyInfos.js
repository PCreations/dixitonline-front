import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const GET_LOBBY_INFOS = gql`
  {
    lobbyInfos {
      waitingGames
      connectedPlayers
    }
  }
`;

export const useLobbyInfos = () => {
  const { data } = useQuery(GET_LOBBY_INFOS);

  const lobbyInfos = data
    ? data.lobbyInfos
    : {
        waitingGames: 0,
        connectedPlayers: 0,
      };

  return lobbyInfos;
};
