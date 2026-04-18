import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVCL_BNBJByLic0AkLRGANG3aNw-Rfa90",
  authDomain: "gorev-takip-8242b.firebaseapp.com",
  projectId: "gorev-takip-8242b",
  storageBucket: "gorev-takip-8242b.firebasestorage.app",
  messagingSenderId: "305206351507",
  appId: "1:305206351507:web:9584fbf1fa8cc553c75f66",
  measurementId: "G-35MJZZ9T14",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
