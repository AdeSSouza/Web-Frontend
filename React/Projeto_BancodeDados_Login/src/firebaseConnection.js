import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "x",
    authDomain: "x",
    projectId: "x",
    storageBucket: "x",
    messagingSenderId: "x",
    appId: "x",
    measurementId: "x"
  };

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);

export { db, auth };
