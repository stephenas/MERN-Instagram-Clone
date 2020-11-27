import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCYw2aptTYjKZkxC1dFZnXxjumZbHUw_gk",
  authDomain: "instagram-clone-8df5b.firebaseapp.com",
  databaseURL: "https://instagram-clone-8df5b.firebaseio.com",
  projectId: "instagram-clone-8df5b",
  storageBucket: "instagram-clone-8df5b.appspot.com",
  messagingSenderId: "408790004265",
  appId: "1:408790004265:web:2805b38151795a997c2238",
  measurementId: "G-59DKY5JZCK",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
