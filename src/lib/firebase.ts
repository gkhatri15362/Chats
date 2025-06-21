import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCk19djQWtsAIPd14b_ra0vwn6kDKlVL4g",
  authDomain: "chats-mk.firebaseapp.com",
  projectId: "chats-mk",
  storageBucket: "chats-mk.firebasestorage.app",
  messagingSenderId: "539855793273",
  appId: "1:539855793273:web:e4de4f21a52f72eec778a8",
  measurementId: "G-2ZKCV40X33" 
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
