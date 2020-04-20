import React, { useState, useCallback, useContext } from 'react';
import { Segment, Message } from 'semantic-ui-react';
import { TitledBox } from './TitledBox';
import { Input } from './Input';
import { Button } from './Button';
import { I18nTranslateContext } from './I18nContext';

export const ChoseUsername = ({ onUsernameSubmitted }) => {
  const t = useContext(I18nTranslateContext);
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
    <TitledBox title={t('username.chose-username')}>
      <Segment basic textAlign="center">
        {hasError && (
          <Message negative>
            <p>{t('username.error-cant-be-empty')}</p>
          </Message>
        )}
        <Input
          placeholder={t('username.placeholder')}
          style={{ marginRight: '10px' }}
          onChange={handleUsernameChange}
        />
        <Button primary onClick={handleUsernameSubmitted}>
          GO
        </Button>
      </Segment>
    </TitledBox>
  );
};
