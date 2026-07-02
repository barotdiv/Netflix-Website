import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {

}

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);