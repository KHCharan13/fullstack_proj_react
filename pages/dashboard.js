import {auth, db} from "../utils/firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import Router, { useRouter } from "next/router";
import { useEffect ,useState} from "react";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import {BsTrash2Fill} from 'react-icons/bs';
import {AiFillEdit} from 'react-icons/ai';
import Message from "../components/message";
import Link from 'next/link';
export default function Dashboard(){

    const route =useRouter();
    const[user,loading] = useAuthState(auth);
    const [posts,setPosts] =useState([])
    const getData = async () =>{
        if(loading) return;
        if(!user) return route.push("/auth/login");

        const collectionRef =collection(db,'posts');
        const q = query(collectionRef, where('user','==',user.uid));
        const unsubscribe = onSnapshot(q,(snapshot =>{
            setPosts(snapshot.docs.map((doc)=>({...doc.data() , id:doc.id}))
        )
    }));
    return unsubscribe;
    };


    const deletePost = async(id)=>{
        const docRef =doc(db,'posts',id)
        await deleteDoc(docRef); 
    }
    //get users data
    useEffect(()=>{
        getData();
    },[user,loading]);
    return(
        <div>
            <div className="flex justify-between">
                <h1 className="flex justify-center">Your Posts</h1>
            <button className="bg-purple-100 px-4 py-2 rounded-2xl border-violet-700 border-2" onClick={()=> auth.signOut()}>Sign out</button>
            </div>
            <div className="bg-slate-900 p-10 rounded-3xl mt-3">
                {posts.map((post)=>{
                    return(
                    <Message {...post} key={post.id}>
                        <div className="flex justify-evenly"><button onClick={()=>deletePost(post.id)} className="text-red-500 flex gap-2 items-center p-4 justify-center text-sm"><BsTrash2Fill/>Delete</button>
                        <Link href={{pathname :"/post" ,query :post}}>
                        <button className="text-sky-700 p-4 flex gap-2 items-center justify-center text-sm"><AiFillEdit/>Edit</button>
                        </Link>
                        </div>
                        
                    </Message>);
                })}
            </div>
            
        </div>
    );

}