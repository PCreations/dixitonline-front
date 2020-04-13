import React, { useState, useEffect } from 'react';
import { firebaseApp } from './firebase-app';
import { AuthStateContext, AuthSetStateContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    currentUser: {
      id: '',
      username: '',
    },
  });

  useEffect(
    () =>
      firebaseApp.auth().onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then((idToken) => localStorage.setItem('idToken', idToken));
          setAuthState((state) => ({
            isAuthenticated: true,
            currentUser: {
              id: user.uid,
              username: user.displayName || state.currentUser.usrname,
            },
          }));
        }
      }),
    [setAuthState]
  );

  useEffect(() => {
    const user = firebaseApp.auth().currentUser;
    if (authState.currentUser.username && !user.displayName) {
      user.updateProfile({ displayName: authState.currentUser.username });
    }
  }, [authState]);

  return (
    <AuthStateContext.Provider value={authState}>
      <AuthSetStateContext.Provider value={setAuthState}>{children}</AuthSetStateContext.Provider>
    </AuthStateContext.Provider>
  );
};
