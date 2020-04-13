import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { TitledBox } from './TitledBox';
import { Avatar } from './Avatar';
import { Button } from './Button';

const MIN_PLAYERS_TO_START_GAME = 4;

const canStartGame = (players) => players.length >= MIN_PLAYERS_TO_START_GAME;

export const GameWaitingForPlayers = ({ gameId, players, isHost, onStartGameClicked, startGameIsLoading }) => (
  <TitledBox title={`Partie ${gameId}`}>
    <Segment textAlign="center" basic style={{ padding: '0' }}>
      <p>
        {canStartGame(players)
          ? isHost
            ? 'Vous pouvez maintenant lancer la partie'
            : 'En attente du lancement de la partie'
          : 'En attente de joueurs...'}
      </p>
    </Segment>
    {players.map(({ id, username }) => (
      <Segment basic key={id} style={{ padding: '0' }}>
        <Avatar username={username} showUsername={true} />
      </Segment>
    ))}
    {canStartGame(players) && isHost && (
      <Segment textAlign="center" basic>
        <Button primary onClick={onStartGameClicked} loading={startGameIsLoading}>
          Lancer la partie !
        </Button>
      </Segment>
    )}
  </TitledBox>
);

GameWaitingForPlayers.propTypes = {
  gameId: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    })
  ),
};
