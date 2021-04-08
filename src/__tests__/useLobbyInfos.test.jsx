import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { renderHook } from '@testing-library/react-hooks';
import { GET_LOBBY_INFOS, useLobbyInfos } from '../hooks';

jest.mock('../graphql-client');

describe.only('useLobbyInfos', () => {
  it('retrieves informations about lobby infos', async () => {
    const mocks = [
      {
        request: {
          query: GET_LOBBY_INFOS,
        },
        result: {
          data: {
            lobbyInfos: {
              waitingGames: 42,
              connectedPlayers: 117,
            },
          },
        },
      },
    ];
    const wrapper = ({ children }) => <MockedProvider mocks={mocks}>{children}</MockedProvider>;

    // act
    const { result, waitForValueToChange } = renderHook(() => useLobbyInfos(), { wrapper });
    const defaultValue = result.current;
    await waitForValueToChange(() => result.current);
    const retrievedLobbyInfos = result.current;

    // assert
    expect(defaultValue).toEqual({
      waitingGames: 0,
      connectedPlayers: 0,
    });
    expect(retrievedLobbyInfos).toEqual({
      waitingGames: 42,
      connectedPlayers: 117,
    });
  });
});
