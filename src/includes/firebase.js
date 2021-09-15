import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyASDQGc6nRdQlPyFYoqfO1a8OplN0Cl7Zk",
    authDomain: "mkostrzewa.firebaseapp.com",
    projectId: "mkostrzewa",
    storageBucket: "mkostrzewa.appspot.com",
    messagingSenderId: "1067418567039",
    appId: "1:1067418567039:web:7d8c082dd47c6af2539a4a",
    measurementId: "G-9B1BETN7YT"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const userCollection = db.collection('users');

export { auth, db, userCollection }