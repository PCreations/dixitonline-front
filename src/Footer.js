import React, { useContext } from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import { I18nTranslateContext } from './I18nContext';

export const Footer = () => {
  const t = useContext(I18nTranslateContext);
  return (
    <>
      <Segment textAlign="center" basic>
        <p>
          {t('footer.rights')}
          <a href="https://www.libellud.com/dixit-2/">Libellud</a>. {t('footer.game-created-by')}
        </p>
      </Segment>
      <Segment textAlign="center" basic>
        <p>
          Dixit Online - {t('footer.created-by')} Pierre Criulanscy
          <a href="https://github.com/PCreations/dixitonline" alt="github" target="_blank" rel="noopener noreferrer">
            <Icon name="github square" size="large" />
          </a>
          <a href="https://twitter.com/_PCreations" alt="twitter" target="_blank" rel="noopener noreferrer">
            <Icon name="twitter" size="large" />
          </a>
        </p>
      </Segment>
      <Segment textAlign="center" basic>
        <a href="https://ko-fi.com/F1F047Y9M" target="_blank" rel="noopener noreferrer">
          <img
            height="36"
            style={{ border: 0, height: 36 }}
            src="https://cdn.ko-fi.com/cdn/kofi1.png?v=2"
            border="0"
            alt="Buy Me a Coffee at ko-fi.com"
          />
        </a>
      </Segment>
    </>
  );
};
