import React, { useCallback, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Segment } from 'semantic-ui-react';
import { StorytellerClue } from '../StorytellerClue';
import { PlayerVoteCardTitledCardGrid, NoModalContentTitledCardGrid } from '../TitledCardGrid';
import { PhaseFragment } from './phase-fragment';
import { Error } from '../Error';
import { I18nTranslateContext } from '../I18nContext';

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
  const t = useContext(I18nTranslateContext);
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
          <p>{t('turn.other-players-voting')}</p>
        </Segment>
      )}
      {error && <Error title={`${t('error.oops')} ${t('an-error-has-occured')}`} message={error} />}
      {voteError && (
        <Error
          title="Oups"
          message={voteError === 'YOU_CANT_VOTE_FOR_YOUR_OWN_CARD' ? t('turn.error-cant-vote-for-own-card') : voteError}
        />
      )}
      {isStoryteller || hasPlayed ? (
        <>
          <NoModalContentTitledCardGrid cards={board} title={t('turn.cards-exposed-to-vote')} />
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
