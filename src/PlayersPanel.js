import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Icon } from 'semantic-ui-react';
import { Flex } from '@chakra-ui/core';
import { Avatar } from './Avatar';

export const PlayersPanel = ({ players, authenticatedPlayerId }) => (
  <Segment basic style={{ marginTop: '10px', borderBottom: '1px solid #718096' }}>
    <Flex justifyContent="space-between">
      {players.map((p) => (
        <div key={p.id} style={{ position: 'relative' }}>
          {p.isStoryteller && <Icon name="edit" style={{ position: 'absolute', left: '34%', top: '-21px' }} />}
          <Avatar username={p.username} ready={p.isReady} grayBorder={p.id === authenticatedPlayerId}></Avatar>
          <span style={{ position: 'relative', left: '17px', top: '5px' }}>{p.score}</span>
        </div>
      ))}
    </Flex>
  </Segment>
);

PlayersPanel.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      isStoryteller: PropTypes.bool.isRequired,
      score: PropTypes.number.isRequired,
      isReady: PropTypes.bool.isRequired,
    })
  ),
  authenticatedPlayerId: PropTypes.string.isRequired,
};
