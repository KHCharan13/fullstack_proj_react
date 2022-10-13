import Message from "../components/message"
import { useRouter } from "next/router"
import { useEffect ,useState } from "react"
import { auth,db} from '../utils/firebase'
import { toast } from "react-toastify"
import { doc,arrayUnion, Timestamp, updateDoc, getDoc, onSnapshot } from "firebase/firestore"
export default function Details(){
    const router = useRouter();
    const routeData = router.query;
    const [message , setMessage] = useState("")
    const [allMessage,setAllMessages] = useState([]);

    // Submit a comment 

    const submitMessage = async() =>{
        //check if user is active

        if(!auth.currentUser) return router.push('/auth/login')

        if(!message){
            toast.error('Comment connot be empty 😶',{
                position: toast.POSITION.TOP_CENTER,
                 autoClose :3000
            });
            return;
        }
        const docRef = doc(db ,'posts',routeData.id);
        await updateDoc(docRef,{
            comments: arrayUnion({
                message,
                avatar: auth.currentUser.photoURL,
                userName : auth.currentUser.displayName,
                time : Timestamp.now(),
            }),
        });
        // reset comment back to blank ""
        setMessage("");
    }

    //get COmments back to the main page
    const getComments = async()=>{
        const docRef = doc(db, "posts", routeData.id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllMessages(snapshot.data().comments);
    });
    return unsubscribe;
    }
    
    useEffect(() =>{
        if(!router.isReady) return;
        getComments();
    },[router.isReady]);
    return(
        <div>
            <Message {...routeData}>
            </Message>

            <div>
                <div className="flex">
                    <input type="text" value={message} placeholder="Add the comment" onChange={(e)=> setMessage(e.target.value)} className="bg-slate-500 text-white w-full p-3 rounded-2xl "/>
                    <button onClick={submitMessage} className="bg-slate-200 ml-3 py-2 px-4 rounded-2xl text-sm">Submit</button>
                </div>
                <div className="py-6">
                    <h2 className="font-bold">Comments</h2>
                    {allMessage?.map((message) => (
            <div className="bg-white p-4 my-4 border-2" key={message.time}>
              <div className="flex items-center gap-2 mb-4">
                <img
                  className="w-10 rounded-full"
                  src={message.avatar}
                  alt=""
                />
                <h2>{message.userName}</h2>
              </div>
              <h2>{message.message}</h2>
            </div>
          ))}
                </div>
            </div>
        </div>
    )
}