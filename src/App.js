import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { ThemeProvider } from '@chakra-ui/core';
import { AuthStateContext } from './AuthContext';
import { AuthProvider } from './AuthProvider';
import { Lobby } from './pages/Lobby';
import { JoinGame } from './pages/JoinGame';
import { Login } from './pages/Login';
import { Game } from './pages/Game';
import { I18nLanguageContext } from './I18nContext';

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useContext(AuthStateContext);
  const { language } = useContext(I18nLanguageContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? children : <Redirect to={{ pathname: `/${language}/login`, state: { from: location } }} />
      }
    />
  );
};

const LocalizedSwitch = () => {
  const { language, setLanguage } = useContext(I18nLanguageContext);
  const match = useRouteMatch('/:lan');
  useEffect(() => {
    if (match?.params?.lan && match.params.lan !== language) {
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

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <LocalizedSwitch />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
