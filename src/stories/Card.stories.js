import React from 'react';
import { action } from '@storybook/addon-actions';
import { Card as CardComponent } from '../Card';

export default { title: 'Card' };

export const Card = () => <CardComponent id="42" src="/cards/card_00001.jpg" onClick={action('card-clicked')} />;

export const withVotes = () => (
  <CardComponent id="42" src="/cards/card_00001.jpg" onClick={action('card-clicked')} votes={['Jaz', 'Pierre']} />
);

export const bordered = () => (
  <CardComponent id="42" src="/cards/card_00001.jpg" onClick={action('card-clicked')} bordered />
);
