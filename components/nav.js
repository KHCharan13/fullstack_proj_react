import Link from "next/link";
import {auth} from "../utils/firebase"
import {useAuthState} from 'react-firebase-hooks/auth'
export default function Nav(){

    const[ user,loading] = useAuthState(auth);
    console.log(user);
    
    return(
        <nav className="flex justify-between items-center py-10">
            <Link className="text-lg font-medium" href="/">
                <button>Weeblog</button>
                </Link>
            <ul className="flex items-center gap-10">

                {!user && (
                <Link href={'/auth/login'}>
                    <a className="bg-purple-500 px-3 py-2 text-sm text-white rounded-2xl font-medium ml-8">Login</a>
                </Link>)}
                {user &&(
                    <div className="flex items-center gap-6">
                        <Link href={'/post'}>
                            <button className="font-medium bg-purple-400 rounded-2xl py-2 px-4 text-white">Post</button>
                        </Link>
                        <Link href={'/dashboard'}>
                           <img className="w-12 rounded-full " src={user.photoURL} alt="dashboard" />
                        </Link>
                    </div>
                )}
            </ul>
        </nav>
    )     
    ;
}