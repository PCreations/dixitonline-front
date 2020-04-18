import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Icon, Responsive } from 'semantic-ui-react';
import { Flex } from '@chakra-ui/core';
import { Avatar } from './Avatar';

export const PlayersPanel = ({ players, authenticatedPlayerId }) => {
  return (
    <Segment basic style={{ marginTop: '10px', borderBottom: '1px solid #718096' }}>
      <Flex justifyContent="space-between">
        {players.map((p) => (
          <div key={p.id}>
            <Responsive as="div" minWidth={414} style={{ textAlign: 'center', paddingBottom: '3px' }}>
              <span>{p.username}</span>
            </Responsive>
            <div style={{ position: 'relative' }}>
              {p.isStoryteller && (
                <Responsive
                  as={Icon}
                  name="edit"
                  style={{ position: 'absolute', left: '34%', top: '-41px' }}
                  minWidth={414}
                />
              )}
              {p.isStoryteller && (
                <Responsive
                  as={Icon}
                  name="edit"
                  style={{ position: 'absolute', left: '34%', top: '-21px' }}
                  maxWidth={320}
                />
              )}
              <Avatar username={p.username} ready={p.isReady} grayBorder={p.id === authenticatedPlayerId}></Avatar>
              <span style={{ position: 'relative', left: '17px', top: '5px' }}>{p.score}</span>
            </div>
          </div>
        ))}
      </Flex>
    </Segment>
  );
};

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
