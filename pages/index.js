import Head from 'next/head'
import Message from '../components/message'
import { useEffect,useState } from 'react'
import { db } from '../utils/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
export default function Home() {

  const [allPosts, setAllPosts] = useState([]);
  const getPosts = async () =>{
    const collectionRef  = collection(db,'posts');
    const q =query(collectionRef, orderBy('timeStamp', 'desc'));

    const unsubscribe = onSnapshot(q,(snapshot)=>{
      setAllPosts(snapshot.docs.map((doc)=> ({...doc.data(), id:doc.id})))
    });
    return unsubscribe;
  };
  useEffect(()=>{
    getPosts();
  },[]);
  return (
    <div>
      <Head>
        <title>Weeblog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex justify-center items-center'>
        <h2 className='my-6 text-lg font-bold'>
      See what others have posted
      </h2>
      </div>
      <div>
      {allPosts.map((post)=>(
        <Message key={post.id} {...post}>
          <Link href={{pathname: `/${post.id}`, query: {...post}}}>
            <button className='p-2 bg-white rounded-2xl '>{post.comments?.length > 0 ? post.comments?.length :0} Comments</button>
          </Link>
           </Message>
      ))}
      </div>     
    </div>
  )
}
