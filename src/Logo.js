import React, { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Image, Segment } from 'semantic-ui-react';
import { Flex, Box } from '@chakra-ui/core';
import { I18nTranslateContext, I18nLanguageContext } from './I18nContext';
import { firebaseApp } from './firebase-app';
import { useColors } from './hooks/useColors';

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

  const { color } = useColors();

  return (
    <Box color={color}>
      <Link to="/">
        <Image src="/dixit.png" centered style={{ padding: '20px' }} alt="Dixit Online" />
      </Link>
      <Segment textAlign="center" basic style={{ padding: 0 }}>
        <p>
          <a href="https://bit.ly/3sX3Awb" target="_blank" rel="noopener noreferrer" onClick={handleDixitWorldClick}>
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
      <Flex justifyContent="center" marginBottom={5}>
        <Segment inverted color="green" textAlign="center">
          {t('info.update')} Spanish translation 🇪🇸 ! Thanks a lot Javier !
        </Segment>
      </Flex>
      <Flex justifyContent="center" marginBottom={5}>
        <Segment inverted color="blue" textAlign="center">
          <a href="https://bit.ly/3b8m4nl" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
            {t('game-ended.survey')}
          </a>
        </Segment>
      </Flex>
    </Box>
  );
};
