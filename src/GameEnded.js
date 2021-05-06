import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Segment, Icon } from 'semantic-ui-react';
import { TitledBox } from './TitledBox';
import { Avatar } from './Avatar';
import { Flex } from '@chakra-ui/core';
import { I18nTranslateContext } from './I18nContext';

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

export const GameEnded = ({ players }) => {
  const t = useContext(I18nTranslateContext);
  players.sort(({ score: scoreA }, { score: scoreB }) => scoreB - scoreA);
  return (
    <>
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
      </TitledBox>
      <Flex justifyContent="center">
        <Segment inverted color="blue" textAlign="center">
          {t('game-ended.thanks')}{' '}
          <a href="https://bit.ly/3b8m4nl" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
            {t('game-ended.survey')}
          </a>
        </Segment>
      </Flex>
    </>
  );
};

GameEnded.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      score: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    })
  ),
};
