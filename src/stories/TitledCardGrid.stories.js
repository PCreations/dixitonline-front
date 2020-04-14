import React from 'react';
import { action } from '@storybook/addon-actions';
import {
  StorytellerTitledCardGrid,
  PlayerChoseCardTitledCardGrid,
  PlayerVoteCardTitledCardGrid,
  NoModalContentTitledCardGrid,
  PlayersVoteResultTitleCardGrid,
} from '../TitledCardGrid';

export default { title: 'TitledCardGrid' };

const cards = [
  { id: '1', src: '/cards/card_1.jpg' },
  { id: '2', src: '/cards/card_2.jpg' },
  { id: '3', src: '/cards/card_3.jpg' },
  { id: '4', src: '/cards/card_4.jpg' },
  { id: '5', src: '/cards/card_5.jpg' },
  { id: '6', src: '/cards/card_6.jpg' },
];

export const noModalContent = () => <NoModalContentTitledCardGrid cards={cards} />;

export const storytellerChoseCard = () => (
  <StorytellerTitledCardGrid cards={cards} onClueSubmitted={action('clue-submitted')} />
);

export const playerChoseCard = () => (
  <PlayerChoseCardTitledCardGrid cards={cards} onCardChosen={action('card-chosen')} />
);

export const playerVoteCard = () => (
  <PlayerVoteCardTitledCardGrid cards={cards} onCardVoted={action('card-voted')} storyteller="Anthow" />
);

export const voteResult = () => (
  <PlayersVoteResultTitleCardGrid
    onReadyForNextTurn={action('ready-for-next-turn')}
    cards={cards.map((c, index) => ({
      ...c,
      ownedByStoryteller: index === 1,
      username: ['Pierre', 'Antho', 'Jaz', 'Noyo', 'Mike', 'Yoyo'][index],
      votes: index === 0 ? ['Jaz'] : index === 1 ? ['Pierre', 'Noyo', 'Mike', 'Yoyo'] : [],
    }))}
  />
);
