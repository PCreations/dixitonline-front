import React from 'react';
import { action } from '@storybook/addon-actions';
import { GameConfigurationForm } from '../GameConfigurationForm';

export default { title: 'Game configuration' };

export const form = () => <GameConfigurationForm onSubmitted={action('configuration-submitted')} />;

export const loading = () => <GameConfigurationForm onSubmitted={action('configuration-submitted')} loading />;
