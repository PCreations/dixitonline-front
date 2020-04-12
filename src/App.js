import React from 'react';
import { CSSReset } from '@chakra-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@chakra-ui/core';
import { Lobby } from './Lobby';
import { Game } from './Game';
import { JoinGame } from './JoinGame';

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <BrowserRouter>
        <Switch>
          <Route exact path="/join/:gameId" children={<JoinGame />} />
          <Route exact path="/game/:gameId" children={<Game />} />
          <Route exact path="/" children={<Lobby />} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
