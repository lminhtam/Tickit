import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAYRYb8Qh-4ZFIRdBgP7HLflmBQyujTKgg',
  authDomain: 'tickit-group06.firebaseapp.com',
  databaseURL: 'https://tickit-group06.firebaseio.com',
  projectId: 'tickit-group06',
  storageBucket: 'tickit-group06.appspot.com',
  messagingSenderId: '632063081492',
  appId: '1:632063081492:web:9213d7319b1fa540b1bb01',
  measurementId: 'G-F96JME9J4T',
  persistence: true,
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
