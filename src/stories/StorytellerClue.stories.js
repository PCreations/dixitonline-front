import React from 'react';
import { StorytellerClue } from '../StorytellerClue';

export default { title: 'StorytellerClue' };

export const defaultState = () => <StorytellerClue storyteller="Anthow" clue="danger sous-marin" />;

export const seenAsStoryteller = () => <StorytellerClue storyteller="Anthow" clue="danger sous-marin" isStoryteller />;
