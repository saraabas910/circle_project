
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import Post from '../components/post';
import { AuthContext } from '../components/contexts/authContext';


export default function Postdetails( ) {
  const {UserToken} =  useContext(AuthContext);
  const {postId} = useParams();
  const [post, setPost] = useState(null);

async function getpostdetails(){
  try{
    const {data} = await axios.get(
      `https://route-posts.routemisr.com/posts/${postId}`,
      {
        headers:{
          Authorization: `Bearer ${UserToken}`
        }
      }
    );
    console.log(data.data.post);
    setPost(data.data.post);
  }catch(err){
    console.log(err.response?.data);
  }
}

    
useEffect(()=>{
{
    getpostdetails();
  }
},[postId, UserToken])

console.log("postId:", postId);
console.log("token:", UserToken);

  return (
    <div className="max-w-xl mx-auto py-10 grid gap-6">
      {post && <Post post={post}/>}

      </div>
  )
  }
