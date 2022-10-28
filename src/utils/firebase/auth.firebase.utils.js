import "./firebase.utils";

import { CreateUserDocumentFromAuth } from "./firestore.firebase.utils";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  getAuth,
  signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

const auth = getAuth();

const signOutUser = async () => await signOut(auth);

const signUserWithGooglePopup = () => signInWithPopup(auth, provider);

const SignUserWithGoogleRedirect = () => signInWithRedirect(auth, provider);

const SignInUserWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logGoogleUser = async () => {
  await signUserWithGooglePopup();
};

const createAuthWithEmailAndPassword = async (displayName, email, password) => {
  if (!email || !password || !displayName) return;

  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  const userRef = await CreateUserDocumentFromAuth(user, displayName);

  return userRef;
};

const onAuthStateChangedListener = (callback) => {
  if (!callback) throw new Error("need callback");

  const observer = onAuthStateChanged(auth, callback);
  return observer;
};

export {
  createAuthWithEmailAndPassword,
  SignInUserWithEmailAndPassword,
  SignUserWithGoogleRedirect,
  onAuthStateChangedListener,
  signUserWithGooglePopup,
  logGoogleUser,
  signOutUser,
  auth,
};
