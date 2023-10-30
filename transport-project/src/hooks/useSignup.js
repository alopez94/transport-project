import { useEffect, useState } from "react";
import { projectAuthentication } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (name, lastName, phone, company, email, password) => {
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
      await response.user.updateProfile({ name, lastName, phone, company });

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
