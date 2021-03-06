import React, { useState, useCallback, useContext } from 'react';
import { Segment, Message, Form, Icon } from 'semantic-ui-react';
import { TitledBox } from './TitledBox';
import { Input } from './Input';
import { Button } from './Button';
import { I18nTranslateContext } from './I18nContext';
import { GameConfigurationForm } from './GameConfigurationForm';

export const GameSelection = ({
  authenticatedUser,
  onCreateNewGameClicked,
  onJoinGameSubmitted,
  createNewGameLoading,
}) => {
  const t = useContext(I18nTranslateContext);
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
    <TitledBox title={t('game-choice.title')}>
      <Segment basic textAlign="center">
        <p>
          {t('welcome.home')} {authenticatedUser} !
        </p>
      </Segment>
      <Segment basic textAlign="center">
        <GameConfigurationForm onSubmitted={onCreateNewGameClicked} loading={createNewGameLoading} />
        <p style={{ marginTop: '10px' }}>{t('game-choice.or')}</p>
        <Form>
          <Form.Field inline>
            <label>{t('game-choice.join-game')}</label>
            <Input placeholder="code" size="mini" error={hasError} onChange={handleCodeChange} />
          </Form.Field>
        </Form>
        {hasError && (
          <Message negative>
            <p>{t('game-choice.code-error-empty')}</p>
          </Message>
        )}
        <Button style={{ marginTop: '10px' }} onClick={handleJoinGameSubmitted}>
          {t('game-choice.join')}
        </Button>
        <Segment basic textAlign="center">
          <a href="https://discord.gg/WQRMufE" alt="dixit online discord server">
            <Icon name="discord" />
            {t('game-choice.discord')}
          </a>
        </Segment>
      </Segment>
    </TitledBox>
  );
};
