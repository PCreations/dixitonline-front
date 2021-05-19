import React from 'react';
import { action } from '@storybook/addon-actions';
import { CardGrid } from '../CardGrid';

const cards = [
  { id: '1', src: '/cards/card_1.jpg' },
  { id: '2', src: '/cards/card_2.jpg' },
  { id: '3', src: '/cards/card_3.jpg' },
  { id: '4', src: '/cards/card_135.jpg' },
  { id: '5', src: '/cards/card_5.jpg' },
  { id: '6', src: '/cards/card_6.jpg' },
  { id: '7', src: '/cards/card_1.jpg' },
  { id: '8', src: '/cards/card_2.jpg' },
  { id: '9', src: '/cards/card_3.jpg' },
  { id: '10', src: '/cards/card_135.jpg' },
  { id: '11', src: '/cards/card_5.jpg' },
  { id: '12', src: '/cards/card_6.jpg' },
  { id: '13', src: '/cards/card_1.jpg' },
  { id: '14', src: '/cards/card_2.jpg' },
  { id: '15', src: '/cards/card_3.jpg' },
  { id: '16', src: '/cards/card_135.jpg' },
  { id: '17', src: '/cards/card_5.jpg' },
  { id: '18', src: '/cards/card_6.jpg' },
  { id: '19', src: '/cards/card_1.jpg' },
  { id: '20', src: '/cards/card_2.jpg' },
  { id: '21', src: '/cards/card_3.jpg' },
  { id: '22', src: '/cards/card_135.jpg' },
  { id: '23', src: '/cards/card_5.jpg' },
  { id: '24', src: '/cards/card_6.jpg' },
];

export default { title: 'CardGrid' };

export const defaultGrid = () => <CardGrid cards={cards} onCardClicked={action('card-clicked')} />;
