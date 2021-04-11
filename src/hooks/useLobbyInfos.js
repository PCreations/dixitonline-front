import { useContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { I18nTranslateContext } from '../I18nContext';
import { firebaseApp } from '../firebase-app';

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
  const [connectedPlayers, setConnectedPlayers] = useState(0);

  useEffect(() => {
    const updateConnectedPlayers = (snp) => {
      console.log('count', snp.val());
      setConnectedPlayers(snp.val() > 0 ? snp.val() : 0);
    };
    firebaseApp.database().ref('metadata/usersConnected').on('value', updateConnectedPlayers);

    return () => firebaseApp.database().ref('metadata/usersConnected').off('value', updateConnectedPlayers);
  }, [setConnectedPlayers]);

  if (!data) {
    return {
      waitingGames: t('lobby-infos.no-waiting-games'),
      connectedPlayers: t('lobby-infos.no-connected-players'),
    };
  }

  const {
    lobbyInfos: { waitingGames },
  } = data;

  const waitingGamesString = `${
    waitingGames === 1
      ? t('lobby-infos.game')
      : waitingGames === 0
      ? t('lobby-infos.no-waiting-games')
      : t('lobby-infos.games')
  }`;
  const connectedPlayersString = `${
    connectedPlayers === 1
      ? t('lobby-infos.connected-player')
      : connectedPlayers === 0
      ? t('lobby-infos.no-connected-players')
      : t('lobby-infos.connected-players')
  }`;

  return {
    waitingGames:
      waitingGames === 0
        ? waitingGamesString
        : `${waitingGames} ${waitingGamesString} ${t('lobby-infos.waiting-players')}`,
    connectedPlayers: connectedPlayers === 0 ? connectedPlayersString : `${connectedPlayers} ${connectedPlayersString}`,
  };
};
