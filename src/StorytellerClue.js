import React, { useContext } from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import { I18nTranslateContext } from './I18nContext';

export const StorytellerClue = ({ storyteller, clue, isStoryteller }) => {
  const t = useContext(I18nTranslateContext);
  return (
    <Segment textAlign="center" basic>
      <p>{isStoryteller ? t('clue.being-the-storyteller') : t('clue.being-a-player', storyteller)}</p>
      <Segment raised inverted color="teal" size="large">
        <p>
          <Icon name="quote left" size="large" />
          {clue}
        </p>
      </Segment>
    </Segment>
  );
};
