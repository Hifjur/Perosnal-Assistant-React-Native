import { useEffect, useState } from "react";
import { Link} from "react-router-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  getIdToken,
} from "firebase/auth";

import {
   
    Text,
    
    Alert,
    
  } from "react-native";
import initializeFirebase from "../../Firebase/Firebase.init";

initializeFirebase();
const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState(false);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const registerUser = (name, email, password) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setError("");
        const newUser = { email, displayName: name };
        setUser(newUser);
        //save user in db
        saveUser(email, name, "POST");
        //send user to firebase
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            history.replace("/");
          })
          .catch((error) => {});
      })
      .catch((error) => {
        setError(error.message);
        // ..
      })
      .finally(() => setIsLoading(false));
  };

  const loginUser = (email, password) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSuccess(true);
        setError("");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const signInWithGoogle = (location, history) => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setError("");
        saveUser(user.email, user.displayName, "PUT");
        const destination = location?.state?.from || "/";
        history.replace(destination);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getIdToken(user).then((idToken) => {
          setToken(idToken);
        });
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribe;
  }, [auth]);

  useEffect(() => {
    fetch(`https://shrouded-tor-90105.herokuapp.com/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin));
  }, [user.email]);
  const logout = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => setIsLoading(false));
  };

  const saveUser = (email, displayName, method) => {
    const user = { email, displayName };
    console.log(user);
    fetch("https://cryptic-falls-87009.herokuapp.com/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return {
    user,
    admin,
    registerUser,
    logout,
    loginUser,
    isLoading,
    error,
    token,
    signInWithGoogle,
    success
  };
};

export default useFirebase;
