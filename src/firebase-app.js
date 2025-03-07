import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/analytics';

const config = {
  apiKey: 'AIzaSyAdpxIPnFMoFz6ePZrOXZ7PTt6KcehMk40',
  authDomain: 'dixit-af060.firebaseapp.com',
  databaseURL: 'https://dixit-af060.firebaseio.com',
  projectId: 'dixit-af060',
  storageBucket: 'dixit-af060.appspot.com',
  messagingSenderId: '409654438041',
  appId: '1:409654438041:web:12fa1267104a0097e6f008',
  measurementId: 'G-5XELPHN1NV',
};
const firebaseDefaultApp = firebase.initializeApp(config);

export const ServerValue = firebase.database.ServerValue;
export const firebaseApp = firebaseDefaultApp;
