import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@chakra-ui/core';
import { AuthStateContext } from './AuthContext';
import { AuthProvider } from './AuthProvider';
import { Lobby } from './pages/Lobby';
import { JoinGame } from './pages/JoinGame';
import { Login } from './pages/Login';
import { Game } from './pages/Game';

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useContext(AuthStateContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />
      }
    />
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path="/join/:gameId" children={<JoinGame />} />
            <PrivateRoute exact path="/game/:gameId" children={<Game />} />
            <PrivateRoute exact path="/" children={<Lobby />} />
            <Route exact path="/login" children={<Login />} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
