import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Flag } from 'semantic-ui-react';
import { I18nLanguageContext } from './I18nContext';

export const LanguageSwitcher = () => {
  const { language } = useContext(I18nLanguageContext);

  return (
    <Segment basic textAlign="center">
      {language === 'fr' ? (
        <Link to="/en/">
          <Flag name="gb" />
        </Link>
      ) : (
        <Link to="/fr/">
          <Flag name="fr" />
        </Link>
      )}
    </Segment>
  );
};
