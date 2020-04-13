import React from 'react';
import { action } from '@storybook/addon-actions';
import { ChoseUsername } from '../ChoseUsername';

export default { title: 'Chose a Username' };

export const emptyState = () => (
  <ChoseUsername onUsernameChange={action('username-change')} onUsernameSubmitted={action('username-submitted')} />
);
