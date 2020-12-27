import React, { useEffect, useContext } from 'react';
import { firebaseApp } from '../firebase-app';
import { AuthStateContext } from '../AuthContext';
import { StorytellerClue } from '../StorytellerClue';
import { PlayersVoteResultTitleCardGrid } from '../TitledCardGrid';

export const ScoringPhase = ({
  gameId,
  hostId,
  cards,
  clue,
  storytellerUsername,
  isStoryteller,
  onReadyForNextTurn,
  isLastTurn,
}) => {
  const { currentUser } = useContext(AuthStateContext);
  useEffect(() => {
    if (hostId === currentUser.id && isLastTurn) {
      firebaseApp.analytics().logEvent('game_ended', {
        gameId,
        userId: hostId,
      });
    }
  }, [currentUser, gameId, hostId, isLastTurn]);
  return (
    <>
      <StorytellerClue clue={clue} storyteller={storytellerUsername} isStoryteller={isStoryteller} />
      <PlayersVoteResultTitleCardGrid cards={cards} onReadyForNextTurn={onReadyForNextTurn} isLastTurn={isLastTurn} />
    </>
  );
};
