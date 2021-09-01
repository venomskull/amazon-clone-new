import firebase from 'firebase';

// const firebaseConfig = {
//     apiKey: "AIzaSyAzOt7w_QM9HPZjaNeE1TgJ94BNORpJeg0",
//     authDomain: "clone-yt-c81c6.firebaseapp.com",
//     projectId: "clone-yt-c81c6",
//     storageBucket: "clone-yt-c81c6.appspot.com",
//     messagingSenderId: "1043941042816",
//     appId: "1:1043941042816:web:1ee09f7b60960521b55465"
//   };

  const firebaseConfig = {
    apiKey: "AIzaSyBNoUnpAEJx24KILHeVpZOhqtGehmni4cQ",
    authDomain: "c-1e43d.firebaseapp.com",
    projectId: "c-1e43d",
    storageBucket: "c-1e43d.appspot.com",
    messagingSenderId: "3106023001",
    appId: "1:3106023001:web:5f64d2ab4a59dc293d7348"
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

  const db = app.firestore();

  export default db;