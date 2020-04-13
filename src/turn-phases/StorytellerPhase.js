import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Segment } from 'semantic-ui-react';
import { StorytellerTitledCardGrid, NoModalContentTitledCardGrid } from '../TitledCardGrid';
import { PhaseFragment } from './phase-fragment';
import { Error } from '../Error';

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
        {isStoryteller ? 'Vous êtes le conteur !' : 'En attente du conteur...'}
      </Segment>
      {error && <Error title="Oups ! Une erreur inattendue est survenue :(" message={error} />}
      {defineClueError && <Error title="Oups" message={defineClueError} />}
      {isStoryteller ? (
        <StorytellerTitledCardGrid cards={cards} onClueSubmitted={handleClueDefined} />
      ) : (
        <NoModalContentTitledCardGrid cards={cards} />
      )}
    </>
  );
};
