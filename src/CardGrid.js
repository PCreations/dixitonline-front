import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { SimpleGrid, Flex } from '@chakra-ui/core';
import { Card } from './Card';
import { I18nTranslateContext } from './I18nContext';

export const CardGrid = ({ cards, onCardClicked }) => {
  const t = useContext(I18nTranslateContext);
  return (
    <SimpleGrid columns={[2, 2, 3, 6]} spacing={2}>
      {cards.map(({ id, url, votes, username, score, ownedByStoryteller }) => (
        <Flex key={id} direction="column" alignItems="center">
          {username && (
            <span>
              {t('card.owner', username)}
              {score !== undefined && score !== 0 ? ` (+ ${score} points !)` : ''}
            </span>
          )}
          <Card id={id} src={url} votes={votes || []} onClick={onCardClicked} bordered={ownedByStoryteller || false} />
        </Flex>
      ))}
    </SimpleGrid>
  );
};

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
