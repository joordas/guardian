import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAmfhYjp3KI4bzf2__USQuG8AJG7YMp9LA',
  authDomain: 'guardian-9da85.firebaseapp.com',
  databaseURL: 'https://guardian-9da85.firebaseio.com',
  projectId: 'guardian-9da85',
  storageBucket: 'guardian-9da85.appspot.com',
  messagingSenderId: '378272281375'
};

export default (!firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app());
