import React, { useState, useCallback } from 'react';
import { Segment, Message, Form, Icon } from 'semantic-ui-react';
import { TitledBox } from './TitledBox';
import { Input } from './Input';
import { Button } from './Button';

export const GameSelection = ({
  authenticatedUser,
  onCreateNewGameClicked,
  onJoinGameSubmitted,
  createNewGameLoading,
}) => {
  const [code, setCode] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleCodeChange = useCallback(
    (event) => {
      setHasError(false);
      setCode(event.target.value);
    },
    [setHasError, setCode]
  );

  const handleJoinGameSubmitted = useCallback(() => {
    if (code === '') {
      setHasError(true);
    } else {
      onJoinGameSubmitted({ code });
    }
  }, [onJoinGameSubmitted, code]);

  return (
    <TitledBox title="Choix de partie">
      <Segment basic textAlign="center">
        <p>Bienvenue {authenticatedUser} !</p>
      </Segment>
      <Segment basic textAlign="center">
        <Button primary onClick={onCreateNewGameClicked} loading={createNewGameLoading}>
          Créer une nouvelle partie
        </Button>
        <p style={{ marginTop: '10px' }}>ou</p>
        <Form>
          <Form.Field inline>
            <label>Rejoindre une partie :</label>
            <Input placeholder="code" size="mini" error={hasError} onChange={handleCodeChange} />
          </Form.Field>
        </Form>
        {hasError && (
          <Message negative>
            <p>Le code ne peut pas être vide</p>
          </Message>
        )}
        <Button style={{ marginTop: '10px' }} onClick={handleJoinGameSubmitted}>
          rejoindre
        </Button>
        <Segment basic textAlign="center">
          <a href="https://discord.gg/WQRMufE" alt="dixit online discord server">
            <Icon name="discord" />
            Trouvez des parties en attente de joueurs grâce à Discord !
          </a>
        </Segment>
      </Segment>
    </TitledBox>
  );
};
