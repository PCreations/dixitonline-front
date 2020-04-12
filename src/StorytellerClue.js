import React from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';

export const StorytellerClue = ({ storyteller, clue }) => (
  <Segment textAlign="center" basic>
    <p>{storyteller} a donné l'indice :</p>
    <Segment raised inverted color="grey">
      <Header as="h4">
        <Icon name="quote left" size="small" />
        <Header.Content>{clue}</Header.Content>
      </Header>
    </Segment>
  </Segment>
);
