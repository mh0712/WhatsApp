import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC8mW8eiv3XwRiLkXhtfa2X8j6YVG1hXEk",
    authDomain: "whatsapp-a5c5a.firebaseapp.com",
    projectId: "whatsapp-a5c5a",
    storageBucket: "whatsapp-a5c5a.appspot.com",
    messagingSenderId: "664910018212",
    appId: "1:664910018212:web:9bc2a2e806e2f747ce9831",
    measurementId: "G-FJK0K8Z8XQ"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();

  export { auth, provider };
  export { db };
