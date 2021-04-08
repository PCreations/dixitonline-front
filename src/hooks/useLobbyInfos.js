import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { I18nTranslateContext } from '../I18nContext';

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
  const t = useContext(I18nTranslateContext);

  if (!data) {
    return {
      waitingGames: t('lobby-infos.no-waiting-games'),
      connectedPlayers: t('lobby-infos.no-connected-players'),
    };
  }

  const {
    lobbyInfos: { waitingGames, connectedPlayers },
  } = data;

  const waitingGamesString = `${
    data.lobbyInfos.waitingGames === 1 ? t('lobby-infos.game') : t('lobby-infos.games')
  } ${t('lobby-infos.waiting-players')}`;
  const connectedPlayersString = `${
    data.lobbyInfos.connectedPlayers === 1 ? t('lobby-infos.connected-player') : t('lobby-infos.connected-players')
  }`;

  return {
    waitingGames: `${waitingGames} ${waitingGamesString}`,
    connectedPlayers: `${connectedPlayers} ${connectedPlayersString}`,
  };
};
