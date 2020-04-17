import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';

export const Footer = () => (
  <>
    <Segment textAlign="center" basic>
      <p>
        Dixit - Tous droits réservés <a href="https://www.libellud.com/dixit-2/">Libellud</a>. Jeu original créé par
        Jean-Louis Roubira, illustré par Marie Cardouat.
      </p>
    </Segment>
    <Segment textAlign="center" basic>
      <p>
        Dixit Online - Créé par Pierre Criulanscy -{' '}
        <a href="https://github.com/PCreations/dixitonline" alt="github" target="_blank" rel="noopener noreferrer">
          <Icon name="github square" size="large" />
        </a>
        <a href="https://twitter.com/_PCreations" alt="twitter" target="_blank" rel="noopener noreferrer">
          <Icon name="twitter" size="large" />
        </a>
      </p>
    </Segment>
  </>
);
