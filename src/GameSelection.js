import React, { useState, useCallback, useContext } from 'react';
import { Segment, Message, Form, Icon } from 'semantic-ui-react';
import { TitledBox } from './TitledBox';
import { Input } from './Input';
import { Button } from './Button';
import { I18nTranslateContext } from './I18nContext';
import { GameConfigurationForm } from './GameConfigurationForm';

export const GameSelection = ({
  authenticatedUser,
  onPlayNowClicked,
  onCreateNewGameClicked,
  onJoinGameSubmitted,
  createNewGameLoading,
  playNowLoading,
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
        <Button primary style={{ marginTop: '10px' }} onClick={onPlayNowClicked} loading={playNowLoading}>
          {t('game-choice.play-now')}
        </Button>
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
      </Segment>
    </TitledBox>
  );
};
