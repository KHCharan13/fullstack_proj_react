 import {FcGoogle } from "react-icons/fc"
 import {signInWithPopup , GoogleAuthProvider } from "firebase/auth"
 import { auth } from "../../utils/firebase";
 import { useRouter } from "next/router";
 import {useAuthState} from 'react-firebase-hooks/auth'
import { useEffect } from "react";

 export default function Login(){
    const route = useRouter();
    const [user, loading ] = useAuthState(auth);
    //sign in with google function

    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async()=>{
        try {
            const result = await signInWithPopup(auth,googleProvider);
            route.push("/");
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        if(user){
            route.push("/")

        }
        else{
            console.log("login");
        }
    },[user]);
    return(
        <div className="shadow-xl mt-28 p-10 text-indigo-800 rounded-lg">
            <h2 className="text-2xl font-medium">Join Now</h2>
            <div className="py-5">
            <h3 className="py-5">Sign up with one the providers</h3>
            <button onClick={GoogleLogin} className="text-white bg-gray-800 w-full p-3 font-medium rounded-2xl flex align-middle gap-4">
            <FcGoogle className="text-2xl"/>
                Sign in with Google
            </button>
            </div>
        </div>
    );

 }