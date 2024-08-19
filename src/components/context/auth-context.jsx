import React, { useContext, createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../../utilities/firebase/firebase"; //import auth instance from /firebase dep

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [userCredential, setUserCredential] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      // console.log("UsER Authtenticated as: ");
    });

    return unsubscribe;
  }, []);

  async function signup(email, password, userName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      if (user) {
        console.log(user, "userCredential.user", userName);
        await updateProfile(userCredential.user, {
          displayName: userName,
        });
      }

      const userDisplayName = userCredential.user.displayName;
      if (userDisplayName) {
        console.log("User signed up with username:", userDisplayName);
        setDisplayName(userDisplayName);
      }
      // console.log("user cred", userCred.user);
      setUserCredential(userCredential);
    } catch (error) {
      console.log(error.message);
    }
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Function to get current username
  // function getCurrentUsername() {
  //   const user = auth.currentUser;
  //   if (user) {
  //     console.log("Username:", user.displayName);
  //     return user.displayName;
  //   } else {
  //     console.log("No user is signed in");
  //     return null;
  //   }
  // }

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
    userName,
    setUserName,
    updateProfile,
    userCredential,
    setUserCredential,
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
