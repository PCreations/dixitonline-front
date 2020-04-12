import React, { useEffect, useCallback, useState } from 'react';
import firebase from 'firebase/app';
import { Box, Input, Button, ThemeProvider, CSSReset } from '@chakra-ui/core';
import 'firebase/auth';
import { AuthContext } from './AuthContext';

const config = {
  apiKey: 'AIzaSyAdpxIPnFMoFz6ePZrOXZ7PTt6KcehMk40',
  authDomain: 'dixit-af060.firebaseapp.com',
  databaseURL: 'https://dixit-af060.firebaseio.com',
  projectId: 'dixit-af060',
  storageBucket: 'dixit-af060.appspot.com',
  messagingSenderId: '409654438041',
  appId: '1:409654438041:web:12fa1267104a0097e6f008',
};
firebase.initializeApp(config);

export const Authenticated = ({ children }) => {
  const [username, setUsername] = useState('');
  const [currentUser, setCurrentUser] = useState(firebase.auth().currentUser);
  const handleUsernameChange = useCallback(
    event => {
      setUsername(event.target.value);
    },
    [setUsername]
  );
  const signInAnonymously = useCallback(() => {
    firebase.auth().signInAnonymously();
  }, []);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(setCurrentUser);
  }, [setCurrentUser]);

  useEffect(() => {
    if (currentUser !== null) {
      currentUser.getIdToken().then(idToken => localStorage.setItem('idToken', idToken));
      if (!currentUser.displayName) {
        currentUser.updateProfile({ displayName: username });
      }
    } else {
      localStorage.setItem('idToken', null);
    }
  }, [currentUser, username]);

  const isSgnedInAndHaveAusername = currentUser?.uid && currentUser?.displayName;

  if (!isSgnedInAndHaveAusername) {
    return (
      <ThemeProvider>
        <CSSReset />
        <Box d="flex" justifyContent="center">
          <Input value={username} onChange={handleUsernameChange} placeholder="pseudo" size="lg" />
          <Button size="lg" onClick={signInAnonymously}>
            OK
          </Button>
        </Box>
      </ThemeProvider>
    );
  }
  return (
    <AuthContext.Provider value={{ id: currentUser.uid, username: currentUser.displayName }}>
      {children}
    </AuthContext.Provider>
  );
};
