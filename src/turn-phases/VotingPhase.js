import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Segment } from 'semantic-ui-react';
import { StorytellerClue } from '../StorytellerClue';
import { PlayerVoteCardTitledCardGrid, NoModalContentTitledCardGrid } from '../TitledCardGrid';
import { PhaseFragment } from './phase-fragment';
import { Error } from '../Error';

const TURN_VOTE = gql`
  mutation TurnVote($voteInput: TurnVoteInput!) {
    turnVote(voteInput: $voteInput) {
      ... on TurnVoteResultSuccess {
        phase {
          ...Phase
        }
      }
      ... on TurnVoteResultError {
        type
      }
    }
  }
  ${PhaseFragment}
`;

export const VotingPhase = ({ turnId, board, cards, clue, storytellerUsername, isStoryteller, hasPlayed }) => {
  const [vote, { error, data }] = useMutation(TURN_VOTE);

  const handleVote = useCallback(
    ({ id }) => {
      vote({ variables: { voteInput: { turnId, cardId: id } } });
    },
    [vote, turnId]
  );

  const voteError = data && data.turnVote.type;

  return (
    <>
      <StorytellerClue clue={clue} storyteller={storytellerUsername} isStoryteller={isStoryteller} />
      {(isStoryteller || hasPlayed) && (
        <Segment basic textAlign="center">
          <p>Les autres joueurs sont en train de voter...</p>
        </Segment>
      )}
      {error && <Error title="Oups ! Une erreur inattendue est survenue :(" message={error} />}
      {voteError && (
        <Error
          title="Oups"
          message={
            voteError === 'YOU_CANT_VOTE_FOR_YOUR_OWN_CARD'
              ? 'Vous ne pouvez pas voter pour votre propre carte !'
              : voteError
          }
        />
      )}
      {isStoryteller || hasPlayed ? (
        <>
          <NoModalContentTitledCardGrid cards={board} title="Cartes soumises au vote" />
          <hr />
          <NoModalContentTitledCardGrid cards={cards} />
        </>
      ) : (
        <>
          <PlayerVoteCardTitledCardGrid cards={board} storyteller={storytellerUsername} onCardVoted={handleVote} />
          <hr />
          <NoModalContentTitledCardGrid cards={cards} />
        </>
      )}
    </>
  );
};
