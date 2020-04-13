import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Segment } from 'semantic-ui-react';
import { StorytellerClue } from '../StorytellerClue';
import { PlayerChoseCardTitledCardGrid, NoModalContentTitledCardGrid } from '../TitledCardGrid';
import { PhaseFragment } from './phase-fragment';
import { Error } from '../Error';

const TURN_CHOSE_CARD = gql`
  mutation TurnChoseCard($choseCardInput: TurnChoseCardInput!) {
    turnChoseCard(choseCardInput: $choseCardInput) {
      ... on TurnChoseCardResultSuccess {
        phase {
          ...Phase
        }
      }
    }
  }
  ${PhaseFragment}
`;

export const PlayersCardChoicePhase = ({ turnId, cards, clue, storytellerUsername, isStoryteller, hasPlayed }) => {
  const [choseCard, { error, data }] = useMutation(TURN_CHOSE_CARD);

  const handleChoseCard = useCallback(
    ({ id }) => {
      choseCard({ variables: { choseCardInput: { turnId, cardId: id } } });
    },
    [choseCard, turnId]
  );

  const choseCardError = data && data.turnChoseCard.type;

  return (
    <>
      <StorytellerClue clue={clue} storyteller={storytellerUsername} isStoryteller={isStoryteller} />
      {(isStoryteller || hasPlayed) && (
        <Segment basic textAlign="center">
          <p>En attente des autres joueurs...</p>
        </Segment>
      )}
      {error && <Error title="Oups ! Une erreur inattendue est survenue :(" message={error} />}
      {choseCardError && <Error title="Oups" message={choseCardError} />}
      {isStoryteller || hasPlayed ? (
        <NoModalContentTitledCardGrid cards={cards} />
      ) : (
        <PlayerChoseCardTitledCardGrid cards={cards} onCardChosen={handleChoseCard} />
      )}
    </>
  );
};
