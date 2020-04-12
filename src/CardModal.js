import React, { useState, useCallback } from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { Flex } from '@chakra-ui/core';
import { Card } from './Card';
import { Input } from './Input';
import { Button } from './Button';
import { Avatar } from './Avatar';

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
      <p>Définir l'indice pour cette carte</p>
      <Input placeholder="indice" style={{ marginRight: '10px' }} onChange={handleClueChange} error={hasError} />
      <Button primary onClick={handleClueSubmitted} style={{ marginTop: '10px' }}>
        VALIDER
      </Button>
    </CardModalSegment>
  );
};

export const PlayerChoiceCardModalContent = ({ onCardChosen }) => (
  <CardModalSegment>
    <Button primary onClick={onCardChosen}>
      CHOISIR CETTE CARTE
    </Button>
  </CardModalSegment>
);

export const PlayerVoteCardModalContent = ({ onCardVoted }) => (
  <CardModalSegment>
    <Button primary onClick={onCardVoted}>
      VOTER POUR CETTE CARTE
    </Button>
  </CardModalSegment>
);

export const VoteResultsCardModalContent = ({ votes = [] } = {}) =>
  votes.length > 0 ? (
    <CardModalSegment>
      <p>Joueur(s) ayant voté pour cette carte :</p>
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
      <p>Personne n'a voté pour cette carte.</p>
    </CardModalSegment>
  );
