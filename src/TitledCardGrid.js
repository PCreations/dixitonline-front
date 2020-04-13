import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { Button } from './Button';
import { TitledBox } from './TitledBox';
import { CardGrid } from './CardGrid';
import {
  CardModal,
  StorytellerCardModalContent,
  PlayerChoiceCardModalContent,
  PlayerVoteCardModalContent,
  VoteResultsCardModalContent,
} from './CardModal';

const TitledCardGrid = ({ cards, title, children, renderBeforeCards }) => {
  const [modalState, setModalState] = useState({ card: { id: '', src: '' }, open: false });

  const handleCardClick = useCallback(
    ({ id }) => {
      const card = cards.find((c) => c.id === id);
      setModalState({
        card,
        open: true,
      });
    },
    [cards, setModalState]
  );

  const closeModal = useCallback(
    () =>
      setModalState((state) => ({
        ...state,
        open: false,
      })),
    [setModalState]
  );

  return (
    <TitledBox title={title} noSidePadding fullWidth>
      {renderBeforeCards && renderBeforeCards()}
      <CardGrid cards={cards} onCardClicked={handleCardClick} />
      <CardModal open={modalState.open} src={modalState.card.src} onClose={closeModal}>
        {children && children({ closeModal, cardId: modalState.card.id })}
      </CardModal>
    </TitledBox>
  );
};

export const NoModalContentTitledCardGrid = ({ cards }) => {
  return <TitledCardGrid title="Votre main" cards={cards} />;
};

export const StorytellerTitledCardGrid = ({ cards, onClueSubmitted }) => {
  const handleClueSubmitted = useCallback(
    ({ closeModal, cardId }) => ({ clue }) => {
      closeModal();
      onClueSubmitted({ clue, cardId });
    },
    [onClueSubmitted]
  );
  return (
    <TitledCardGrid title="Choisissez une carte" cards={cards}>
      {({ closeModal, cardId }) => (
        <StorytellerCardModalContent onClueSubmitted={handleClueSubmitted({ closeModal, cardId })} />
      )}
    </TitledCardGrid>
  );
};

export const PlayerChoseCardTitledCardGrid = ({ cards, onCardChosen }) => {
  const handleCardChosen = useCallback(
    ({ closeModal, cardId }) => () => {
      onCardChosen({ id: cardId });
      closeModal();
    },
    [onCardChosen]
  );

  return (
    <TitledCardGrid title="Choisissez une carte" cards={cards}>
      {({ closeModal, cardId }) => (
        <PlayerChoiceCardModalContent onCardChosen={handleCardChosen({ closeModal, cardId })} />
      )}
    </TitledCardGrid>
  );
};

export const PlayerVoteCardTitledCardGrid = ({ cards, storyteller, onCardVoted }) => {
  const handleCardVoted = useCallback(
    ({ closeModal, cardId }) => () => {
      onCardVoted({ id: cardId });
      closeModal();
    },
    [onCardVoted]
  );

  return (
    <TitledCardGrid title={`Retrouvez la carte de ${storyteller}`} cards={cards}>
      {({ closeModal, cardId }) => <PlayerVoteCardModalContent onCardVoted={handleCardVoted({ closeModal, cardId })} />}
    </TitledCardGrid>
  );
};

export const PlayersVoteResultTitleCardGrid = ({ cards, onReadyForNextTurn }) => {
  const findCard = (cardId) => cards.find((c) => c.id === cardId);

  const [loading, setLoading] = useState(false);

  const handleOnReadyForNextTurn = useCallback(() => {
    setLoading(true);
    onReadyForNextTurn();
  }, [setLoading, onReadyForNextTurn]);

  return (
    <TitledCardGrid
      title="Résultat des votes"
      cards={cards}
      renderBeforeCards={() => (
        <Segment basic textAlign="center">
          <Button primary onClick={handleOnReadyForNextTurn} loading={loading}>
            Passer au prochain tour
          </Button>
        </Segment>
      )}
    >
      {({ cardId }) => cardId && <VoteResultsCardModalContent votes={findCard(cardId).votes} />}
    </TitledCardGrid>
  );
};

PlayersVoteResultTitleCardGrid.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      ownedByStoryteller: PropTypes.bool.isRequired,
      votes: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};
