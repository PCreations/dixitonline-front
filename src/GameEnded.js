import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Segment, Icon } from 'semantic-ui-react';
import { Flex, Box } from '@chakra-ui/core';
import { Button } from './Button';
import { TitledBox } from './TitledBox';
import { Avatar } from './Avatar';
import { I18nTranslateContext } from './I18nContext';
import { AuthStateContext } from './AuthContext';
import { useColors } from './hooks/useColors';

const getIconForNonWinner = (rank) => {
  switch (rank) {
    case 1:
      return <Icon color="grey" name="certificate" size="big" />;
    case 2:
      return <Icon color="brown" name="certificate" size="large" />;
    default:
      return <Icon name="certificate" />;
  }
};

export const GameEnded = ({ players, restartGame, restartGameLoading, hostId }) => {
  const t = useContext(I18nTranslateContext);
  const { currentUser } = useContext(AuthStateContext);

  const isHost = hostId === currentUser.id;

  const { color } = useColors();

  players.sort(({ score: scoreA }, { score: scoreB }) => scoreB - scoreA);

  return (
    <Box color={color}>
      <TitledBox title={`Résultats de la partie`}>
        <Segment textAlign="center" basic style={{ padding: '0' }}>
          <p>And the winner is...</p>
        </Segment>
        {players.map(({ score, username }, index) => (
          <Segment basic key={index} style={{ padding: '0' }}>
            <Flex justifyContent={index === 0 ? 'center' : 'flex-start'} alignItems="center">
              <Avatar username={username} showUsername={true} />
              {index === 0 && (
                <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                  <Icon color="yellow" name="trophy" size="huge" />
                  <strong style={{ size: '2rem' }}>
                    {t('game-ended.ranking.first')} - {score} points
                  </strong>
                </div>
              )}
              {index !== 0 && (
                <span>
                  <strong>
                    {getIconForNonWinner(index)}
                    {t('game-ended.ranking.other', index + 1)} - {score} points
                  </strong>
                </span>
              )}
            </Flex>
          </Segment>
        ))}
        {isHost && (
          <Flex justifyContent="center">
            <Button primary onClick={restartGame} loading={restartGameLoading}>
              {t('game.restart-game')}
            </Button>
          </Flex>
        )}
      </TitledBox>
      <Flex justifyContent="center" marginTop={5}>
        <Segment inverted color="blue" textAlign="center">
          {t('game-ended.thanks')}{' '}
          <a href="https://bit.ly/3b8m4nl" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
            {t('game-ended.survey')}
          </a>
        </Segment>
      </Flex>
    </Box>
  );
};

GameEnded.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      score: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    })
  ),
  gameId: PropTypes.string.isRequired,
  hostId: PropTypes.string.isRequired,
};
