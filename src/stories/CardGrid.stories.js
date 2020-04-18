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
];

export default { title: 'CardGrid' };

export const defaultGrid = () => <CardGrid cards={cards} onCardClicked={action('card-clicked')} />;
