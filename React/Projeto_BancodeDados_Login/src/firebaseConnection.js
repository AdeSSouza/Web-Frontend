import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDZYtNq3h-MoFoPrx1GFco0PDeiGs03Y44",
    authDomain: "curso-9ac6c.firebaseapp.com",
    projectId: "curso-9ac6c",
    storageBucket: "curso-9ac6c.appspot.com",
    messagingSenderId: "454424240551",
    appId: "1:454424240551:web:db1ed928ff8a467f155682",
    measurementId: "G-229XDKEEPP"
  };

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);

export { db, auth };