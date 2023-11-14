import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  
  signInWithEmailAndPassword,
  
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCF6Rr2ssdzSXfjDgOyQOewygDTFlkdM40",
  authDomain: "crow-closing-db.firebaseapp.com",
  projectId: "crow-closing-db",
  storageBucket: "crow-closing-db.appspot.com",
  messagingSenderId: "1048747538280",
  appId: "1:1048747538280:web:ad002e931265ed01f7c8dd",
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, GoogleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, GoogleProvider);

export const db = getFirestore();

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  const response = createUserWithEmailAndPassword(auth, email, password);
  return response;
};

export const SignInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const createUserDorumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return userDocRef;
};
