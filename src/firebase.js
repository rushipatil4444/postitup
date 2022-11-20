// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';



  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAP1_ossHPCDnpDDJO7tid6tXLZhHJ1L4c",
   authDomain: "postitup-firebase.firebaseapp.com",
   databaseURL: "https://postitup-firebase-default-rtdb.firebaseio.com",
   projectId: "postitup-firebase",
   storageBucket: "postitup-firebase.appspot.com",
   messagingSenderId: "756669788535",
   appId: "1:756669788535:web:872b97dd688e8cfa16b172",
   measurementId: "G-6Q47YK4GKJ"
  });

  const db = firebaseApp.firestore(); //access db 
  const auth = firebase.auth(); //access authentication
  const storage = firebase.storage(); //upload storage
//  grabbing 3 services from firebase

  export {db, auth, storage};