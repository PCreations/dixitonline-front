import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAdpxIPnFMoFz6ePZrOXZ7PTt6KcehMk40',
  authDomain: 'dixit-af060.firebaseapp.com',
  databaseURL: 'https://dixit-af060.firebaseio.com',
  projectId: 'dixit-af060',
  storageBucket: 'dixit-af060.appspot.com',
  messagingSenderId: '409654438041',
  appId: '1:409654438041:web:12fa1267104a0097e6f008',
};
const firebaseDefaultApp = firebase.initializeApp(config);

export const firebaseApp = firebaseDefaultApp;
