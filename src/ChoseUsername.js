import React, { useState, useCallback } from 'react';
import { Segment, Message } from 'semantic-ui-react';
import { TitledBox } from './TitledBox';
import { Input } from './Input';
import { Button } from './Button';

export const ChoseUsername = ({ onUsernameSubmitted }) => {
  const [hasError, setHasError] = useState(false);
  const [username, setUsername] = useState('');

  const handleUsernameSubmitted = useCallback(() => {
    if (username) {
      onUsernameSubmitted({ username });
    } else {
      setHasError(true);
    }
  }, [username, onUsernameSubmitted, setHasError]);

  const handleUsernameChange = useCallback(
    (event) => {
      setHasError(false);
      setUsername(event.target.value);
    },
    [setHasError, setUsername]
  );

  return (
    <TitledBox title="Choisissez un pseudo">
      <Segment basic textAlign="center">
        {hasError && (
          <Message negative>
            <p>Le pseudo ne peut pas être vide</p>
          </Message>
        )}
        <Input placeholder="pseudo" style={{ marginRight: '10px' }} onChange={handleUsernameChange} />
        <Button primary onClick={handleUsernameSubmitted}>
          GO
        </Button>
      </Segment>
    </TitledBox>
  );
};
