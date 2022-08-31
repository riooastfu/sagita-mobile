// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATGb_omplyagNkyoGNtAVC1OYkP6xbzMA",
  authDomain: "other-project-3131c.firebaseapp.com",
  databaseURL: "https://other-project-3131c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "other-project-3131c",
  storageBucket: "other-project-3131c.appspot.com",
  messagingSenderId: "574501137641",
  appId: "1:574501137641:web:47b62a82560333d1f29478",
  measurementId: "G-4TXRDXZS2S"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
}
else{
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };