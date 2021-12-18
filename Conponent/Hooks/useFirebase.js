import { useEffect, useState } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,

  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,

  updateProfile,
  getIdToken,
} from "firebase/auth";

import initializeFirebase from "../../Firebase/Firebase.init";

initializeFirebase();
const useFirebase = () => {
  const [user, setUser] = useState({});
  
  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");
  const auth = getAuth();


  const registerUser = (name, email, password) => {
    
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
      });
  };

  const loginUser = (email, password) => {
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSuccess(true);
        setError("");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
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
      
    });
    return () => unsubscribe;
  }, [auth]);

  
  const logout = () => {
    
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
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
   
    registerUser,
    logout,
    loginUser,
    error,
    token,
    
    success
  };
};

export default useFirebase;
