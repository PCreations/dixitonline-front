import React from 'react';
import { action } from '@storybook/addon-actions';
import { CardGrid } from '../CardGrid';

const cards = [
  { id: '1', src: '/cards/card_00001.jpg' },
  { id: '2', src: '/cards/card_00002.jpg' },
  { id: '3', src: '/cards/card_00003.jpg' },
  { id: '4', src: '/cards/card_00004.jpg' },
  { id: '5', src: '/cards/card_00005.jpg' },
  { id: '6', src: '/cards/card_00006.jpg' },
];

export default { title: 'CardGrid' };

export const defaultGrid = () => <CardGrid cards={cards} onCardClicked={action('card-clicked')} />;
