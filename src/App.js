import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { ThemeProvider, ColorModeProvider } from '@chakra-ui/core';
import { AuthStateContext } from './AuthContext';
import { AuthProvider } from './AuthProvider';
import { Lobby } from './pages/Lobby';
import { JoinGame } from './pages/JoinGame';
import { Login } from './pages/Login';
import { Game } from './pages/Game';
import { I18nLanguageContext, I18nTranslateContext } from './I18nContext';
import { useColors } from './hooks/useColors';

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useContext(AuthStateContext);
  const { language } = useContext(I18nLanguageContext);
  const match = useRouteMatch('/:lan');
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect to={{ pathname: `/${match?.params?.lan ?? language}/login`, state: { from: location } }} />
        )
      }
    />
  );
};

const LocalizedSwitch = () => {
  const { language, setLanguage } = useContext(I18nLanguageContext);
  const match = useRouteMatch('/:lan');
  useEffect(() => {
    if (match?.params?.lan && match.params.lan !== language) {
      console.log('set language', match.params.lan);
      setLanguage(match.params.lan);
    }
  }, [match, language, setLanguage]);
  return (
    <Switch>
      <PrivateRoute exact path={`/:lan/join/:gameId`} children={<JoinGame />} />
      <PrivateRoute exact path={`/:lan/game/:gameId`} children={<Game />} />
      <PrivateRoute exact path={`/:lan/`} children={<Lobby />} />
      <Route exact path={`/:lan/login`} children={<Login />} />
      <Route path="*" render={() => <Redirect to={{ pathname: `/${language}/` }} />} />
    </Switch>
  );
};

const HelmetHeader = () => {
  const t = useContext(I18nTranslateContext);
  const colors = useColors();
  return (
    <Helmet>
      <script type="text/css">
        {`
              body {
                background-color: ${colors.bgColor};
                color: ${colors.color};
              }
            `}
      </script>
      <meta property="og:description" content={t('meta.description')} />
    </Helmet>
  );
};

function App() {

  return (
    <>
      <ThemeProvider>
        <ColorModeProvider>
          <HelmetHeader />
          <AuthProvider>
            <BrowserRouter>
              <LocalizedSwitch />
            </BrowserRouter>
          </AuthProvider>
        </ColorModeProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
