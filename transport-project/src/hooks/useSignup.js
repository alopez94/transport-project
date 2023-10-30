import { useState } from "react"
import { projectAuthentication } from "../firebase/config"

export const useSignup = () => {

    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const signup = async (name, lastName, phone, company, email, password) => {
        setError(null)
        setIsPending(true)

        try{
            //signupuser
            const response = await projectAuthentication.createUserWithEmailAndPassword(email, password)
            console.log('response :>> ', response.user);

            if(!response) {
                throw new Error('Couldnt Complete Signup')
            }

            //add user info
            await response.user.updateProfile({name, lastName, phone, company})

            setIsPending(false);
            setError(null)
        }
        catch(err){
            console.log('err :>> ', err.message);
            setError(err.message)
            setIsPending(false)
        }
    }


    return {error, isPending, signup}
}