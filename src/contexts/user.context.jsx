import { createContext, useEffect, useState } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/auth.firebase.utils";
import { CreateUserDocumentFromAuth } from "../utils/firebase/firestore.firebase.utils";

const userContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const userValue = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsub = onAuthStateChangedListener((user) => {
      if (user) {
        CreateUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsub;
  }, []);

  return (
    <userContext.Provider value={userValue}>{children}</userContext.Provider>
  );
};

export { userContext, UserProvider };
