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
      firebaseApp.auth().onAuthStateChanged(async (user) => {
        if (user) {
          user.getIdToken().then((idToken) => localStorage.setItem('idToken', idToken));

          setAuthState((state) => ({
            isAuthenticated: true,
            currentUser: {
              id: user.uid,
              username: state.username || user.displayName,
            },
          }));
        }
      }),
    [setAuthState]
  );

  useEffect(
    () =>
      firebaseApp.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const alreadyLoggedIn = localStorage.getItem('currentUser') !== null;
          const currentUser = {
            id: user.uid,
            username: user.displayName || authState.currentUser.username,
          };
          console.log('Already logged in ? ', alreadyLoggedIn);
          if (!alreadyLoggedIn) {
            console.log('sending login event');

            firebaseApp.analytics().logEvent('login', {
              userId: currentUser.id,
              userUsername: currentUser.username,
            });

            await firebaseApp.firestore().collection('connected-players').doc(currentUser.id).set(currentUser);
          }
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
      }),
    [authState]
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
