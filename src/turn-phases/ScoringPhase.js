import React from 'react';
import { StorytellerClue } from '../StorytellerClue';
import { PlayersVoteResultTitleCardGrid } from '../TitledCardGrid';

export const ScoringPhase = ({ cards, clue, storytellerUsername, isStoryteller, onReadyForNextTurn, isLastTurn }) => {
  return (
    <>
      <StorytellerClue clue={clue} storyteller={storytellerUsername} isStoryteller={isStoryteller} />
      <PlayersVoteResultTitleCardGrid cards={cards} onReadyForNextTurn={onReadyForNextTurn} isLastTurn={isLastTurn} />
    </>
  );
};
