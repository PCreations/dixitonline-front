import React, { useCallback, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Segment } from 'semantic-ui-react';
import { StorytellerClue } from '../StorytellerClue';
import { PlayerChoseCardTitledCardGrid, NoModalContentTitledCardGrid } from '../TitledCardGrid';
import { PhaseFragment } from './phase-fragment';
import { Error } from '../Error';
import { I18nTranslateContext } from '../I18nContext';

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

export const PlayersCardChoicePhase = ({
  turnId,
  cards,
  clue,
  storytellerUsername,
  isStoryteller,
  hasPlayed,
  threePlayersMode,
}) => {
  const t = useContext(I18nTranslateContext);
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
          <p>{t('turn.waiting-for-other-players')}</p>
        </Segment>
      )}
      {error && <Error title={`${t('error.oops')} ${t('an-error-has-occured')}`} message={error} />}
      {choseCardError && <Error title={t('error.oops')} message={choseCardError} />}
      {isStoryteller || hasPlayed ? (
        <NoModalContentTitledCardGrid cards={cards} />
      ) : (
        <PlayerChoseCardTitledCardGrid
          cards={cards}
          onCardChosen={handleChoseCard}
          threePlayersMode={threePlayersMode}
        />
      )}
    </>
  );
};
