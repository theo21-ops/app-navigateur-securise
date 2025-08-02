// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBGzZVggwWiPv8UYns-SAyRoOFg0Vdpcw0",
  authDomain: "navigateursecurise.firebaseapp.com",
  projectId: "navigateursecurise",
  storageBucket: "navigateursecurise.firebasestorage.app",
  messagingSenderId: "649918291853",
  appId: "1:649918291853:web:8d62a7557163544be9a7c4"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Export de l'authentification
export const auth = getAuth(app);
