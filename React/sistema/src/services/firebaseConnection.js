import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCZskBXoQ42oeWlF_kBflazHU5D55eA0Ac",
    authDomain: "call-system-8f1c6.firebaseapp.com",
    projectId: "call-system-8f1c6",
    storageBucket: "call-system-8f1c6.appspot.com",
    messagingSenderId: "57134891935",
    appId: "1:57134891935:web:6ff305645385e4bd0633aa",
    measurementId: "G-NZ3K139Z9H"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  export { auth, db, storage };