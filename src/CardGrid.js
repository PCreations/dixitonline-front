import React from 'react';
import PropTypes from 'prop-types';
import { SimpleGrid, Flex } from '@chakra-ui/core';
import { Card } from './Card';

export const CardGrid = ({ cards, onCardClicked }) => (
  <SimpleGrid columns={[2, 2, 3, 6]} spacing={2}>
    {cards.map(({ id, src, votes, username, score, ownedByStoryteller }) => (
      <Flex key={id} direction="column" alignItems="center">
        {username && (
          <span>
            Carte de {username}
            {score !== undefined && score !== 0 ? ` (+ ${score} points !)` : ''}
          </span>
        )}
        <Card id={id} src={src} votes={votes || []} onClick={onCardClicked} bordered={ownedByStoryteller || false} />
      </Flex>
    ))}
  </SimpleGrid>
);

CardGrid.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      username: PropTypes.string,
      score: PropTypes.number,
    })
  ),
};
