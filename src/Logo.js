import React, { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Image, Segment, Icon } from 'semantic-ui-react';
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
        <Image src="/tixid.png" centered style={{ padding: '20px' }} alt="Tixid Online" />
      </Link>
      <Flex justifyContent="center" marginBottom={5}>
        <Segment
          inverted
          color="teal"
          textAlign="center"
          style={{ padding: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', borderRadius: '8px' }}
        >
          <a href="https://forms.gle/APXubfGbghK7YbdD8" target="_blank" rel="noopener noreferrer">
            <button
              style={{
                backgroundColor: '#FFD700',
                color: '#333',
                padding: '12px 20px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
              }}
            >
              <span>✨ {t('game-ended.survey')} ✨</span> <Icon name="star" /> <Icon name="arrow right" />
            </button>
          </a>
        </Segment>
      </Flex>
      <Segment textAlign="center" basic style={{ padding: 0 }}>
        <p>
          <a href="https://bit.ly/3sX3Awb" target="_blank" rel="noopener noreferrer" onClick={handleDixitWorldClick}>
            Dixit World
          </a>{' '}
          {t('footer.dixit-world-coming')}{' '}
          <a
            href="https://www.tempete.studio/dixitworld.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDixitWorldRegisterForBetaClick}
          >
            {t('footer.dixit-world-register-beta')}
          </a>
        </p>
      </Segment>
    </Box>
  );
};
