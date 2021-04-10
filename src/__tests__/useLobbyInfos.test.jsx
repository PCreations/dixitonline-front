import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { renderHook } from '@testing-library/react-hooks';
import { GET_LOBBY_INFOS, useLobbyInfos } from '../hooks';
import { I18nProvider } from '../I18nProvider';

const createRenderLobbyInfoHook = ({ waitingGames, connectedPlayers, language }) => {
  const mocks = [
    {
      request: {
        query: GET_LOBBY_INFOS,
      },
      result: {
        data: {
          lobbyInfos: {
            waitingGames,
            connectedPlayers,
          },
        },
      },
    },
  ];
  const wrapper = ({ children }) => (
    <I18nProvider defaultLanguage={language}>
      <MockedProvider mocks={mocks}>{children}</MockedProvider>
    </I18nProvider>
  );

  return {
    async render() {
      const { result, waitForNextUpdate } = renderHook(() => useLobbyInfos(), { wrapper });

      const defaultValue = result.current;
      await waitForNextUpdate();
      const retrievedLobbyInfos = result.current;

      return { defaultValue, retrievedLobbyInfos };
    },
  };
};

describe('useLobbyInfos', () => {
  it('retrieves informations about lobby infos', async () => {
    // arrange
    const { render } = createRenderLobbyInfoHook({
      waitingGames: 42,
      connectedPlayers: 117,
    });

    // act
    const { defaultValue, retrievedLobbyInfos } = await render();

    // assert
    expect(defaultValue).toEqual({
      waitingGames: 'Aucune partie en attente de joueurs',
      connectedPlayers: 'Aucun joueur prêt à jouer',
    });
    expect(retrievedLobbyInfos).toEqual({
      waitingGames: '42 parties en attente de joueurs',
      connectedPlayers: '117 joueurs prêts à jouer',
    });
  });

  it('retrieves informations about lobby infos when there is only one game and one player', async () => {
    // arrange
    const { render } = createRenderLobbyInfoHook({
      waitingGames: 1,
      connectedPlayers: 1,
    });

    // act
    const { defaultValue, retrievedLobbyInfos } = await render();

    // assert
    expect(defaultValue).toEqual({
      waitingGames: 'Aucune partie en attente de joueurs',
      connectedPlayers: 'Aucun joueur prêt à jouer',
    });
    expect(retrievedLobbyInfos).toEqual({
      waitingGames: '1 partie en attente de joueurs',
      connectedPlayers: '1 joueur prêt à jouer',
    });
  });

  it('retrieves informations about lobby infos when there is no games or no plauyers', async () => {
    // arrange
    const { render } = createRenderLobbyInfoHook({
      waitingGames: 0,
      connectedPlayers: 0,
    });

    // act
    const { defaultValue, retrievedLobbyInfos } = await render();

    // assert
    expect(defaultValue).toEqual({
      waitingGames: 'Aucune partie en attente de joueurs',
      connectedPlayers: 'Aucun joueur prêt à jouer',
    });
    expect(retrievedLobbyInfos).toEqual({
      waitingGames: 'Aucune partie en attente de joueurs',
      connectedPlayers: 'Aucun joueur prêt à jouer',
    });
  });

  it('retrieves informations in english', async () => {
    // arrange
    const { render } = createRenderLobbyInfoHook({
      waitingGames: 42,
      connectedPlayers: 117,
      language: 'en',
    });

    // act
    const { defaultValue, retrievedLobbyInfos } = await render();

    // assert
    expect(defaultValue).toEqual({
      waitingGames: 'No games waiting for players',
      connectedPlayers: 'No players ready to play',
    });
    expect(retrievedLobbyInfos).toEqual({
      waitingGames: '42 games waiting for players',
      connectedPlayers: '117 players ready to play',
    });
  });
});
