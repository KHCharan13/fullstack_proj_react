import {auth,db} from '../utils/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { async } from '@firebase/util';
import { addDoc,collection,doc,serverTimestamp, updateDoc } from 'firebase/firestore';
import {toast} from 'react-toastify'
export default function Post(){

    //form state

    const [post, setPost] = useState ({description :""});
    const route =useRouter();
    const routeData =route.query;

    
    const [user,loading] = useAuthState(auth)


    //Post Submit
    const submitPost = async(e)=>{
        e.preventDefault();


        //runing the conditions for post 

        if(!post.description){
            toast.error('Description field empty 😅',{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
            return;
        }
        else if(post.description.length >300){
            toast.error('Description is too long 😥',{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
            return;
        }

        if(post?.hasOwnProperty('id')){
            const docRef = doc(db,'posts',post.id);
            const updatePost = {...post,timeStamp:serverTimestamp()};
            await updateDoc(docRef,updatePost);
            return route.push('/'); 
        }else{

        // adding post into the fire base 
        const collectionRef = collection(db, 'posts');
        await addDoc(collectionRef,{
            ...post,
            timeStamp :serverTimestamp(),
            user: user.uid,
            avatar: user.photoURL,
            username : user.displayName,

        });

        setPost({description :""})
        toast.success("Post has been made✈🪂", {position:toast.POSITION.TOP_CENTER, autoClose:3000,})
        return route.push('/');
    }
    }

    const checkUser = async() =>{
        if(loading) return;
        if(!user) route.push("/auth/login");
        if (routeData.id){
            setPost({ description: routeData.description , id : routeData.id})
        }

    };

    useEffect(()=>{
        checkUser();
    },[user,loading]);
    return(
        <div className='my-20 p-12 shadow-lg rounded-2xl max-w-md mx-auto'>
            <form onSubmit={submitPost}>
                <h1 className='text-2xl font-extrabold'>
                    {post.hasOwnProperty('id') ? 'Edit your Post': 'Create a new Post'}
                </h1>
                <div>
                    <h3 className='text-lg font-medium py-2'>Description</h3>
                    <textarea value={post.description} 
                    onChange={(e) =>setPost({...post , description :e.target.value})}
                    className='bg-gray-700 h-48 w-full text-white rounded-2xl p-4 text-sm'></textarea>
                    <p className={`font-medium text-sm ${post.description.length > 300 ? 'text-red-500':""}`} >{post.description.length}/300</p>
                    <button type='submit'
                     className='w-full bg-purple-400 shadow-xl my-2 text-sm font-medium p-2 rounded-md text-white'>Submit</button>
                </div>
            </form>
        </div>
    );
}