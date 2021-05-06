import React, { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Image, Segment } from 'semantic-ui-react';
import { Flex } from '@chakra-ui/core';
import { I18nTranslateContext, I18nLanguageContext } from './I18nContext';
import { firebaseApp } from './firebase-app';

export const Logo = () => {
  const t = useContext(I18nTranslateContext);
  const { language } = useContext(I18nLanguageContext);

  const handleDixitWorldClick = useCallback(() => {
    console.log('handle click');
    firebaseApp.analytics().logEvent('dixit-world-clicked', {
      language,
    });
  }, [language]);

  const handleDixitWorldRegisterForBetaClick = useCallback(() => {
    firebaseApp.analytics().logEvent('dixit-world-beta-clicked', {
      language,
    });
  }, [language]);
  return (
    <>
      <Link to="/">
        <Image src="/dixit.png" centered style={{ padding: '20px' }} alt="Dixit Online" />
      </Link>
      <Segment textAlign="center" basic style={{ padding: 0 }}>
        <p>
          <a href="https://bit.ly/3sX3Awb" target="_blank" rel="noopener noreferrer" onClick={handleDixitWorldClick}>
            {/* <Image src="/dixit-world-logo.png" alt="Dixit World" size={'small'} inline /> */}
            Dixit World
          </a>{' '}
          {t('footer.dixit-world-coming')}{' '}
          <a
            href="https://bit.ly/3dVVvDV"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDixitWorldRegisterForBetaClick}
          >
            {t('footer.dixit-world-register-beta')}
          </a>
        </p>
      </Segment>
      <Flex justifyContent="center">
        <Segment inverted color="blue" textAlign="center">
          <a href="https://bit.ly/3b8m4nl" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
            {t('game-ended.survey')}
          </a>
        </Segment>
      </Flex>
    </>
  );
};
