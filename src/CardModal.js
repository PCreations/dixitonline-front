import React, { useState, useCallback, useContext } from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { Flex } from '@chakra-ui/core';
import { Card } from './Card';
import { Input } from './Input';
import { Button } from './Button';
import { Avatar } from './Avatar';
import { I18nTranslateContext } from './I18nContext';

const CardModalSegment = ({ children }) => (
  <Segment
    style={{ width: '400px', maxWidth: '100%', color: 'black', backgroundColor: 'white' }}
    textAlign="center"
    basic
  >
    {children}
  </Segment>
);

export const CardModal = ({ src, trigger, children, open, onClose }) => (
  <Modal trigger={trigger} basic closeIcon open={open} onClose={onClose}>
    <Modal.Content scrolling={false}>
      <Card src={src}></Card>
      <Flex justifyContent="center">{children}</Flex>
    </Modal.Content>
  </Modal>
);

export const StorytellerCardModalContent = ({ onClueSubmitted }) => {
  const t = useContext(I18nTranslateContext);
  const [clue, setClue] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleClueChange = useCallback(
    (event) => {
      setHasError(false);
      setClue(event.target.value);
    },
    [setClue]
  );

  const handleClueSubmitted = useCallback(() => {
    if (clue) {
      onClueSubmitted({ clue });
    } else {
      setHasError(true);
    }
  }, [setHasError, onClueSubmitted, clue]);

  return (
    <CardModalSegment>
      <p>{t('card-modal.clue')}</p>
      <Input
        placeholder={t('card-modal.clue-placeholder')}
        style={{ marginRight: '10px' }}
        onChange={handleClueChange}
        error={hasError}
      />
      <Button primary onClick={handleClueSubmitted} style={{ marginTop: '10px' }}>
        {t('card-modal.validate')}
      </Button>
    </CardModalSegment>
  );
};

export const PlayerChoiceCardModalContent = ({ onCardChosen }) => {
  const t = useContext(I18nTranslateContext);
  return (
    <CardModalSegment>
      <Button primary onClick={onCardChosen}>
        {t('card-modal.chose-card')}
      </Button>
    </CardModalSegment>
  );
};

export const PlayerVoteCardModalContent = ({ onCardVoted }) => {
  const t = useContext(I18nTranslateContext);
  return (
    <CardModalSegment>
      <Button primary onClick={onCardVoted}>
        {t('card-modal.vote-card')}
      </Button>
    </CardModalSegment>
  );
};

export const VoteResultsCardModalContent = ({ votes = [] } = {}) => {
  const t = useContext(I18nTranslateContext);
  return votes.length > 0 ? (
    <CardModalSegment>
      <p>{t('card-modal.vote-result')}</p>
      <Flex justifyContent="center">
        {votes.map((username, index) => (
          <div style={{ marginRight: '5px' }} key={`${index}${username}`}>
            <Avatar username={username} />
          </div>
        ))}
      </Flex>
    </CardModalSegment>
  ) : (
    <CardModalSegment>
      <p>{t('card-modal.no-votes')}</p>
    </CardModalSegment>
  );
};
