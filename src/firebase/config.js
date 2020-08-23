import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlj76tu00htxqyMei2MHTl-GQBYSCauJk",
  authDomain: "tic-tac-toe-2e010.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-2e010.firebaseio.com",
  projectId: "tic-tac-toe-2e010",
  storageBucket: "tic-tac-toe-2e010.appspot.com",
  messagingSenderId: "1039840572489",
  appId: "1:1039840572489:web:3c6e6761dc7bd0fe15bb98",
  measurementId: "G-VMY6BSE6TK",
};

if (!firebase.apps.length) {
  firebase.initializeApp({});
}

export { firebase };
