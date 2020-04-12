import React from 'react';
import PropTypes from 'prop-types';
import { SimpleGrid } from '@chakra-ui/core';
import { Card } from './Card';

export const CardGrid = ({ cards, onCardClicked }) => (
  <SimpleGrid columns={[2, 2, 3, 6]} spacing={2}>
    {cards.map(({ id, src, votes, ownedByStoryteller }) => (
      <Card
        key={id}
        id={id}
        src={src}
        votes={votes || []}
        onClick={onCardClicked}
        bordered={ownedByStoryteller || false}
      />
    ))}
  </SimpleGrid>
);

CardGrid.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    })
  ),
};
