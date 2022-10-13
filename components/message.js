import { Children } from "react";

export default function Message({children,avatar ,username, description}){
    return(
        <div className="bg-purple-100 p-8 border-b-2 rounded-2xl mb-7">
            <div className="flex items-center gap-3 ">
                <img src={avatar} className="w-10 rounded-full" alt="" />
                <h2>{username}</h2>
            </div>
            <div className="py-4">
                <p>{description}</p>
            </div>
            {children}
        </div>
    );
}