import { useEffect, useState } from "react";
import { projectAuthentication, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import {} from "firebase/firestore"

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (name, lastName, phone, company, displayName, email, password) => {
    setError(null);
    setIsPending(true);

    try {
      //signupuser
        const response =
        await projectAuthentication.createUserWithEmailAndPassword(
          email,
          password
        );

      if (!response) {
        throw new Error("Couldnt Complete Signup");
      }

      //add user info
      await response.user.updateProfile({ displayName });

      //create a user document 
      await projectFirestore.collection('users').doc(response.user.uid).set({
        name,
        lastName,
        phone,
        company,
        displayName,
        isAdmin: false
      })

      //dispatch login action
      dispatch({ type: "LOGIN", payload: response.user });


       if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
        if (!isCancelled) {
            console.log("err :>> ", err.message);
            setError(err.message);
            setIsPending(false);
          }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup };
};
