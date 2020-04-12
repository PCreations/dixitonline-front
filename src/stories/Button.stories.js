import React from 'react';
import { Button } from '../Button';
import { action } from '@storybook/addon-actions';

export default { title: 'Button' };

export const primaryButton = () => (
  <Button primary onClick={action('primary-button-click')}>
    Primary button
  </Button>
);

export const secondaryButton = () => <Button onClick={action('secondary-button-click')}>Secondary button</Button>;
