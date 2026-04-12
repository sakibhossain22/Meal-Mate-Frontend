import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9pO-z9ZdHp_n0j1_OoRdMKjSzARr4c5Q",
  authDomain: "mealmate-c065c.firebaseapp.com",
  projectId: "mealmate-c065c",
  storageBucket: "mealmate-c065c.firebasestorage.app",
  messagingSenderId: "137564946682",
  appId: "1:137564946682:web:9c5766345ab9ed19e20943"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };