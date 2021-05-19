import React, { useCallback, useState, useContext } from 'react';
import { Form } from 'semantic-ui-react';
import { Flex } from '@chakra-ui/core';
import { Button } from './Button';
import { I18nTranslateContext } from './I18nContext';
import { useColors } from './hooks/useColors';

export const EndingCondition = {
  DEFAULT: 'default',
  X_TIMES_STORYTELLER: 'xTimesStoryteller',
  SCORE_LIMIT: 'scoreLimit',
};

export const GameConfigurationForm = ({ onSubmitted, loading }) => {
  const t = useContext(I18nTranslateContext);
  const [endingCondition, setEndingCondition] = useState(EndingCondition.DEFAULT);
  const [value, setValue] = useState(1);
  const [hasError, setHasError] = useState(false);
  const { color } = useColors();

  const handleOnSubmit = useCallback(() => {
    if (value < 1) {
      setHasError(true);
    } else {
      onSubmitted({
        endingCondition,
        value,
      });
    }
  }, [value, setHasError, endingCondition, onSubmitted]);

  const handleEndingConditionChange = useCallback(
    (_, target) => {
      setEndingCondition(target.value);
    },
    [setEndingCondition]
  );

  const handleValueChange = useCallback(
    (_, target) => {
      setHasError(false);
      setValue(target.value);
    },
    [setHasError, setValue]
  );

  return (
    <Form>
      <Flex justifyContent="center" direction="column" alignItems="center">
        <Form.Select
          inline
          label={<label style={{ color }}>{t('game-configuration.ending-condition')}</label>}
          value={endingCondition}
          onChange={handleEndingConditionChange}
          options={[
            {
              key: EndingCondition.DEFAULT,
              text: t('game-configuration.default'),
              value: EndingCondition.DEFAULT,
              active: endingCondition === EndingCondition.DEFAULT,
            },
            {
              key: EndingCondition.X_TIMES_STORYTELLER,
              text: t('game-configuration.x-times-storyteller'),
              value: EndingCondition.X_TIMES_STORYTELLER,
              active: endingCondition === EndingCondition.X_TIMES_STORYTELLER,
            },
            {
              key: EndingCondition.SCORE_LIMIT,
              text: t('game-configuration.points-limit'),
              value: EndingCondition.SCORE_LIMIT,
              active: endingCondition === EndingCondition.SCORE_LIMIT,
            },
          ]}
        />
        {endingCondition !== EndingCondition.DEFAULT && (
          <Form.Input
            label={<label style={{ color }}>{t('game-configuration.value-label')}</label>}
            inline
            type="number"
            value={value}
            onChange={handleValueChange}
            error={
              hasError
                ? {
                    content: t('game-configuration.value-error'),
                    pointing: 'below',
                  }
                : false
            }
            required
          />
        )}
        <Button primary onClick={handleOnSubmit} loading={loading}>
          {t('game-choice.create-new-game')}
        </Button>
      </Flex>
    </Form>
  );
};
