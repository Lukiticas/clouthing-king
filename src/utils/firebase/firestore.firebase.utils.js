import "./firebase.utils";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const db = getFirestore();

const registerInDB = async (userDocRef, displayName, email, createdAt) => {
  try {
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt,
    });
  } catch (error) {
    console.error("error in creating user", error.message);
  }
};

const CreateUserDocumentFromAuth = async (
  userAuth,
  displayNameFromExternal = null
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const username =
      displayNameFromExternal == null ? displayName : displayNameFromExternal;

    registerInDB(userDocRef, username, email, createdAt);
  }

  return userDocRef;
};

export { CreateUserDocumentFromAuth };
