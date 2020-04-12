import React from 'react';
import { Segment, Message } from 'semantic-ui-react';
import { TitledBox } from './TitledBox';
import { Input } from './Input';
import { Button } from './Button';

export const ChoseUsername = ({ onUsernameChange, onUsernameSubmitted, error }) => (
  <TitledBox title="Choisissez un pseudo">
    <Segment basic textAlign="center">
      {error && (
        <Message negative>
          <p>Le pseudo ne peut pas être vide</p>
        </Message>
      )}
      <Input placeholder="pseudo" style={{ marginRight: '10px' }} onChange={onUsernameChange} error={error} />
      <Button primary onClick={onUsernameSubmitted}>
        GO
      </Button>
    </Segment>
  </TitledBox>
);
