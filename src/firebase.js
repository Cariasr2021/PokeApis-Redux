import firebase from 'firebase/app'
import  'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCsFHmHMAfNQQ0_YwWpxurpdKs2B3Uepe4",
    authDomain: "crud-udemy-react1-7d1a5.firebaseapp.com",
    projectId: "crud-udemy-react1-7d1a5",
    storageBucket: "crud-udemy-react1-7d1a5.appspot.com",
    messagingSenderId: "337619874465",
    appId: "1:337619874465:web:b9d55fd13beabeb50476e0"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export  {auth, firebase, db, storage}