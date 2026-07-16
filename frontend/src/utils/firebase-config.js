import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyMockKeyForDevOnly1234567890",
  authDomain: "netflix-clone-mock.firebaseapp.com",
  projectId: "netflix-clone-mock",
  storageBucket: "netflix-clone-mock.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:mockappidentity12345"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const db = getFirestore();