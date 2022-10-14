import "./firebase.utils";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { CreateUserDocumentFromAuth } from "./firestore.firebase.utils";

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

const auth = getAuth();
const signInGPopUp = () => signInWithPopup(auth, provider);
const signInGRedirect = () => signInWithRedirect(auth, provider);

const createAuthWithEmailAndPassword = async (displayName, email, password) => {
  if (!email || !password || !displayName) return;

  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  const userRef = await CreateUserDocumentFromAuth(user, displayName);
  return userRef;
};

export { signInGPopUp, signInGRedirect, createAuthWithEmailAndPassword, auth };
