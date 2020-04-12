import React from 'react';
import { withKnobs, radios } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Button } from 'semantic-ui-react';
import {
  CardModal,
  StorytellerCardModalContent,
  PlayerChoiceCardModalContent,
  PlayerVoteCardModalContent,
  VoteResultsCardModalContent,
} from '../CardModal';

export default { title: 'CardModal', decorators: [withKnobs] };

export const defaultModal = () => {
  const storytellerCardContent = <StorytellerCardModalContent onClueSubmitted={action('clue-submitted')} />;
  const playerChoiceContent = <PlayerChoiceCardModalContent onCardChosen={action('card-chosen')} />;
  const label = 'Content';
  const options = {
    noContent: 'noContent',
    storytellerContent: 'storytellerContent',
    playerChoiceContent: 'playerChoiceContent',
  };
  const value = radios(label, options, options.noContent);
  return (
    <CardModal src="cards/card_00001.jpg" trigger={<Button>Show Modal</Button>}>
      {(() => {
        switch (value) {
          case options.storytellerContent:
            return storytellerCardContent;
          case options.playerChoiceContent:
            return playerChoiceContent;
          default:
            return <p>content</p>;
        }
      })()}
    </CardModal>
  );
};

export const storytellerCardModalContent = () => (
  <StorytellerCardModalContent onClueChange={action('clue-change')} onClueSubmitted={action('clue-submitted')} />
);

export const playerChoiceCardModalContent = () => <PlayerChoiceCardModalContent onCardChosen={action('card-chosen')} />;

export const playerVoteCardModalContent = () => <PlayerVoteCardModalContent onCardVoted={action('card-voted')} />;

export const voteResultsCardModalContent = () => <VoteResultsCardModalContent votes={['Noyo', 'Jaz']} />;

export const noVotesCardModalContent = () => <VoteResultsCardModalContent votes={[]} />;
