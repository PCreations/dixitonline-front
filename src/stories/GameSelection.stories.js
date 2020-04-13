import React from 'react';
import { action } from '@storybook/addon-actions';
import { GameSelection } from '../GameSelection';

export default { title: 'GameSelection' };

export const defaultState = () => (
  <GameSelection
    authenticatedUser="Anthow"
    onCreateNewGameClicked={action('create-new-game-click')}
    onJoinGameSubmitted={action('join-game-submitted')}
  />
);
