import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Icon } from 'semantic-ui-react';
import { TitledBox } from './TitledBox';
import { Avatar } from './Avatar';
import { Flex } from '@chakra-ui/core';

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
  players.sort(({ score: scoreA }, { score: scoreB }) => scoreB - scoreA);
  return (
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
                <strong style={{ size: '2rem' }}>1er - {score} points</strong>
              </div>
            )}
            {index !== 0 && (
              <span>
                <strong>
                  {getIconForNonWinner(index)}
                  {index + 1}ème - {score} points
                </strong>
              </span>
            )}
          </Flex>
        </Segment>
      ))}
    </TitledBox>
  );
};

GameEnded.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      score: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    })
  ),
};
