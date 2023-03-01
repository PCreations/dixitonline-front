import React, { useState, useCallback, useContext } from 'react';
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
import { I18nTranslateContext } from './I18nContext';

const TitledCardGrid = ({ cards, title, children, renderBeforeCards }) => {
  const [modalState, setModalState] = useState({ card: { id: '', url: '' }, open: false });

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
      <CardModal open={modalState.open} src={modalState.card.url} onClose={closeModal}>
        {children && children({ closeModal, cardId: modalState.card.id })}
      </CardModal>
    </TitledBox>
  );
};

export const NoModalContentTitledCardGrid = ({ cards, title }) => {
  const t = useContext(I18nTranslateContext);
  const overridenTitle = title || t('titled-card-grid.your-hand');
  return <TitledCardGrid title={overridenTitle} cards={cards} />;
};

export const StorytellerTitledCardGrid = ({ cards, onClueSubmitted }) => {
  const t = useContext(I18nTranslateContext);
  const handleClueSubmitted = useCallback(
    ({ closeModal, cardId }) => ({ clue }) => {
      closeModal();
      onClueSubmitted({ clue, cardId });
    },
    [onClueSubmitted]
  );
  return (
    <TitledCardGrid title={t('titled-card-grid.chose-card')} cards={cards}>
      {({ closeModal, cardId }) => (
        <StorytellerCardModalContent onClueSubmitted={handleClueSubmitted({ closeModal, cardId })} />
      )}
    </TitledCardGrid>
  );
};

export const PlayerChoseCardTitledCardGrid = ({ cards, onCardChosen, threePlayersMode }) => {
  const t = useContext(I18nTranslateContext);
  const handleCardChosen = useCallback(
    ({ closeModal, cardId }) => () => {
      onCardChosen({ id: cardId });
      closeModal();
    },
    [onCardChosen]
  );

  return (
    <TitledCardGrid
      title={threePlayersMode ? t('titled-card-grid.chose-two-cards') : t('titled-card-grid.chose-card')}
      cards={cards}
    >
      {({ closeModal, cardId }) => (
        <PlayerChoiceCardModalContent onCardChosen={handleCardChosen({ closeModal, cardId })} />
      )}
    </TitledCardGrid>
  );
};

export const PlayerVoteCardTitledCardGrid = ({ cards, storyteller, onCardVoted }) => {
  const t = useContext(I18nTranslateContext);
  const handleCardVoted = useCallback(
    ({ closeModal, cardId }) => () => {
      onCardVoted({ id: cardId });
      closeModal();
    },
    [onCardVoted]
  );

  return (
    <TitledCardGrid title={t('titled-card-grid.find-card', storyteller)} cards={cards}>
      {({ closeModal, cardId }) => <PlayerVoteCardModalContent onCardVoted={handleCardVoted({ closeModal, cardId })} />}
    </TitledCardGrid>
  );
};

export const PlayersVoteResultTitleCardGrid = ({ cards, onReadyForNextTurn, isLastTurn }) => {
  const t = useContext(I18nTranslateContext);
  const findCard = (cardId) => cards.find((c) => c.id === cardId);

  const [loading, setLoading] = useState(false);

  const handleOnReadyForNextTurn = useCallback(() => {
    setLoading(true);
    onReadyForNextTurn();
  }, [setLoading, onReadyForNextTurn]);

  return (
    <TitledCardGrid
      title={t('titled-card-grid.vote-results')}
      cards={cards}
      renderBeforeCards={() => (
        <Segment basic textAlign="center">
          <Button primary onClick={handleOnReadyForNextTurn} loading={loading}>
            {isLastTurn ? t('titled-card-grid.see-leaderboard') : t('titled-card-grid.go-to-next-turn')}
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
      score: PropTypes.number.isRequired,
    })
  ),
};
