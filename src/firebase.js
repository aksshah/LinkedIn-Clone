import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAJPEP2oQNYxIdkS7ur0mn0aJ9lQiUEzgo",
  authDomain: "linkedin-clone-3c702.firebaseapp.com",
  projectId: "linkedin-clone-3c702",
  storageBucket: "linkedin-clone-3c702.appspot.com",
  messagingSenderId: "980718371298",
  appId: "1:980718371298:web:196eff43586a860b5439bb"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();


export {db, auth};