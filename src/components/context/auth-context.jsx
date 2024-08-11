import React, { useContext, createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from "firebase/auth";

import { auth } from "../../utilities/firebase/firebase";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [displayName, setDisplayName] = useState("");


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      console.log("UsER Authtenticated as: ", user);
    });

    return unsubscribe;
  }, []);

  function signup(email, password) {
    const userCredential = createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  }

  function login(email, password) {
    const logginUser = signInWithEmailAndPassword(auth, email, password);
    console.log("logging in Sucessful at: ", logginUser);
    return logginUser;
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    const reset = sendPasswordResetEmail(auth, email);
    console.log(reset, reset.status);
    return reset;
  }

  function updateProfileEmail(newEmail) {
    return updateEmail(auth.currentUser, newEmail);
  }

  function updateProfilePassword(newPassword) {
    return updatePassword(auth.currentUser, newPassword);
  }
  const value = {
    signup,
    login,
    logout,
    currentUser,
    resetPassword,
    updateProfileEmail,
    updateProfilePassword,
    displayName, setDisplayName
    
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// export function useAuth() {
//   return useContext(AuthContext);
// }

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
