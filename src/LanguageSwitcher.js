import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Flag } from 'semantic-ui-react';
import { I18nLanguageContext } from './I18nContext';

const FlagLink = ({ language, name }) => (
  <Link to={`/${language}/`}>
    <Flag name={name} />
  </Link>
);

const renderFlagsFromLanguage = (actualLanguage) => {
  const availableLanguages = {
    fr: 'fr',
    en: 'gb',
    de: 'de',
    it: 'it',
    es: 'es',
    ca: 'es',
    pt: 'br',
    th: 'th',
    tr: 'tr',
    ja: 'jp',
  };
  return (
    <Segment basic textAlign="center">
      {Object.entries(availableLanguages)
        .filter(([language]) => actualLanguage !== language)
        .map(([language, name]) => (
          <FlagLink language={language} name={name} key={name} />
        ))}
    </Segment>
  );
};

export const LanguageSwitcher = () => {
  const { language } = useContext(I18nLanguageContext);

  return renderFlagsFromLanguage(language);
};
