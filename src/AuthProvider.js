import React, { useState, useEffect } from 'react';
import { firebaseApp, ServerValue } from './firebase-app';
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
          user
            .getIdToken()
            .then((idToken) => {
              localStorage.setItem('idToken', idToken);
              return idToken;
            })
            .then(() => {
              const metadataRef = firebaseApp.database().ref(`metadata`);
              firebaseApp
                .database()
                .ref('.info/connected')
                .on('value', (snp) => {
                  if (snp.val() === false) {
                    return false;
                  }
                  metadataRef
                    .onDisconnect()
                    .update({
                      usersConnected: ServerValue.increment(-1),
                    })
                    .then(() => {
                      metadataRef.update({
                        usersConnected: ServerValue.increment(1),
                      });
                    });
                });
            });
          setAuthState((state) => ({
            isAuthenticated: true,
            currentUser: {
              id: user.uid,
              username: state.currentUser.username || user.displayName,
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
