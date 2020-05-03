import React, { useCallback, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { Flex } from '@chakra-ui/core';
import { Button } from './Button';

export const EndingCondition = {
  DEFAULT: 'default',
  X_TIMES_STORYTELLER: 'xTimesStoryteller',
  SCORE_LIMIT: 'scoreLimit',
};

export const GameConfigurationForm = ({ onSubmitted, loading }) => {
  const [endingCondition, setEndingCondition] = useState(EndingCondition.DEFAULT);
  const [value, setValue] = useState(1);
  const [hasError, setHasError] = useState(false);

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
          label="Condition de fin de partie"
          value={endingCondition}
          onChange={handleEndingConditionChange}
          options={[
            {
              key: EndingCondition.DEFAULT,
              text: 'Par défaut',
              value: EndingCondition.DEFAULT,
              active: endingCondition === EndingCondition.DEFAULT,
            },
            {
              key: EndingCondition.X_TIMES_STORYTELLER,
              text: 'Nombre de fois conteur',
              value: EndingCondition.X_TIMES_STORYTELLER,
              active: endingCondition === EndingCondition.X_TIMES_STORYTELLER,
            },
            {
              key: EndingCondition.SCORE_LIMIT,
              text: 'Limite de points',
              value: EndingCondition.SCORE_LIMIT,
              active: endingCondition === EndingCondition.SCORE_LIMIT,
            },
          ]}
        />
        {endingCondition !== EndingCondition.DEFAULT && (
          <Form.Input
            label="Valeur"
            inline
            type="number"
            value={value}
            onChange={handleValueChange}
            error={
              hasError
                ? {
                    content: 'La valeur doit être supérieur à zéro',
                    pointing: 'below',
                  }
                : false
            }
            required
          />
        )}
        <Button primary onClick={handleOnSubmit} loading={loading}>
          Créer une nouvelle partie
        </Button>
      </Flex>
    </Form>
  );
};
