import firebase from 'firebase';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCBj6GJQuzFcI8tIzwpK2S76wZbsJpqboQ",
    authDomain: "shreyan-s-store.firebaseapp.com",
    projectId: "shreyan-s-store",
    storageBucket: "shreyan-s-store.appspot.com",
    messagingSenderId: "1006153298329",
    appId: "1:1006153298329:web:75c279b76c5581954ba308",
    measurementId: "G-T4H4Q9DSSV"
};

const firebaseApp= firebase.initializeApp(firebaseConfig);

const db= firebaseApp.firestore();
const auth= firebase.auth();
const provider= new firebase.auth.GoogleAuthProvider();




export {db, auth, provider};