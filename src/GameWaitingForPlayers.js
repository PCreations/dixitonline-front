import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { TitledBox } from './TitledBox';
import { Avatar } from './Avatar';
import { Button } from './Button';
import { I18nTranslateContext } from './I18nContext';

const MIN_PLAYERS_TO_START_GAME = 3;

const canStartGame = (players) => players.length >= MIN_PLAYERS_TO_START_GAME;

export const GameWaitingForPlayers = ({ gameId, players, isHost, onStartGameClicked, startGameIsLoading }) => {
  const t = useContext(I18nTranslateContext);
  return (
    <TitledBox title={`Partie ${gameId}`}>
      <Segment textAlign="center" basic style={{ padding: '0' }}>
        <p>
          {canStartGame(players)
            ? isHost
              ? t('game-waiting.can-be-started')
              : t('game-waiting.waiting-to-be-started')
            : t('game-waiting.waiting-for-players')}
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
            {t('game-waiting.start-game')}
          </Button>
        </Segment>
      )}
    </TitledBox>
  );
};

GameWaitingForPlayers.propTypes = {
  gameId: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    })
  ),
};
