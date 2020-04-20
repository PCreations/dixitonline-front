import React, { useCallback, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Segment } from 'semantic-ui-react';
import { StorytellerTitledCardGrid, NoModalContentTitledCardGrid } from '../TitledCardGrid';
import { PhaseFragment } from './phase-fragment';
import { Error } from '../Error';
import { I18nTranslateContext } from '../I18nContext';

const TURN_DEFINE_CLUE = gql`
  mutation TurnDefineClue($defineClueInput: TurnDefineClueInput!) {
    turnDefineClue(defineClueInput: $defineClueInput) {
      ... on TurnDefineClueResultSuccess {
        phase {
          ...Phase
        }
      }
      ... on TurnDefineClueResultError {
        type
      }
    }
  }
  ${PhaseFragment}
`;

export const StorytellerPhase = ({ turnId, isStoryteller, cards }) => {
  const t = useContext(I18nTranslateContext);
  const [defineClue, { error, data }] = useMutation(TURN_DEFINE_CLUE);

  const handleClueDefined = useCallback(
    ({ clue, cardId }) => {
      defineClue({ variables: { defineClueInput: { turnId, clue, cardId } } });
    },
    [defineClue, turnId]
  );

  const defineClueError = data && data.turnDefineClue.type;

  return (
    <>
      <Segment basic textAlign="center">
        {isStoryteller ? t('turn.you-are-the-storyteller') : t('turn.waiting-for-storyteller')}
      </Segment>
      {error && <Error title={`${t('error.oops')} ${t('an-error-has-occured')}`} message={error} />}
      {defineClueError && <Error title={t('error.oops')} message={defineClueError} />}
      {isStoryteller ? (
        <StorytellerTitledCardGrid cards={cards} onClueSubmitted={handleClueDefined} />
      ) : (
        <NoModalContentTitledCardGrid cards={cards} />
      )}
    </>
  );
};
