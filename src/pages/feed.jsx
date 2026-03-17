import React from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../components/contexts/authContext';
import { useEffect } from 'react';
import {useState} from 'react'; 
import Post from '../components/post';
import CreatePost from '../components/Createpost';

export default function feed() {
   const {UserToken} =  useContext(AuthContext);
   const [posts, setPosts] = useState([]);

 async function getposts(){


  const {data} = await axios.get("https://route-posts.routemisr.com/posts",

    {
        headers: {
           Authorization : `Bearer ${UserToken}`
        }
    }
  );
          setPosts(data.data.posts);
         /*console.log("psts",data);*/

        
          
 }

 useEffect(()=>{

    getposts(); },[])


  return (

      
         
    <div className="w-full py-10 flex flex-col gap-6 px-4" style={{maxWidth: "600px", margin: "0 auto"}}>
      <CreatePost getPosts={getposts} />

       {posts.map((post)=>{
       return<Post post={post} getPosts={getposts} />

       })
       }
   
    </div>
  )
}
