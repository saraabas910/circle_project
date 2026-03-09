import { Link } from "react-router-dom";
import commentIcon from "/src/assets/comment-svgrepo-com.svg";
import Createcomment from "./Createcomment";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../components/contexts/authContext";

export default function Post({ post, getPosts }) {
  const { UserToken } = useContext(AuthContext);

  const [comments, setComments] = useState([]);


  async function getComments() {
    try {
      const { data } = await axios.get(
        `https://route-posts.routemisr.com/posts/${post._id}/comments?page=1&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${UserToken}`,
          },
        }
      ); 
    

      setComments(data.data.comments || []);
    } catch (error) {
      console.log(error.response?.data || error);
    }
  }


  useEffect(() => {
    if (post?._id) {
      getComments();
    }
  }, [post._id]);

async function deletePost() {
  try {
    await axios.delete(
      `https://route-posts.routemisr.com/posts/${post._id}`,
      {
        headers: {
          Authorization: `Bearer ${UserToken}`,
        },
      }
    );

    getPosts(); 
  } catch (error) {
    console.log(error.response?.data || error);
  }
}


  return (
    <article className="mb-4 p-6 rounded-xl bg-gray-100 dark:bg-slate-800 flex flex-col w-full">

      {/* Post Header */}
      <div className="flex pb-6 items-center justify-between">
        <div className="flex">
          <img
            className="rounded-full w-12 h-12 mr-4"
            src={post.user.photo}
          />

          <div className="flex flex-col">
            <span className="text-lg font-bold dark:text-white">
              {post.user.name}
            </span>

            <span className="text-slate-500 text-sm">
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <h2 className="text-3xl font-extrabold dark:text-white">
        {post.body}
      </h2>

      {post.image && (
        <div className="py-4">
          <img
            className="w-full max-h-72 object-contain rounded-lg"
            src={post.image}
          />
        </div>
      )}

      {/* Likes + Comments Count */}
      <div className="py-4 flex gap-4">
        ❤️ {post.likesCount}

        <span className="flex items-center gap-2">
          <img src={commentIcon} className="w-6 h-6" />
          {comments.length}
        </span>
      </div>

      {/* Create Comment */}
   <Createcomment
  postId={post._id}
  getPosts={getPosts}
  getComments={getComments}
  
/>

      {/* Comments List */}
      <div className="pt-6">
        {comments.map((comment) => (
          <div key={comment._id} className="flex pb-4 gap-4">

            <img
              className="rounded-full w-12 h-12"
              src={comment.commentCreator.photo}
            />

            <div>
              <div className="font-bold">
                {comment.commentCreator.name}
              </div>

              <p>{comment.content}</p>
            </div>

          </div>
        ))}
      </div>

      {/* More comments */}
      <Link
        to={`/posts/${post._id}`}
        className="py-3 block bg-slate-100 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200"
      >
        Show more comments
      </Link>

    </article>
  );
}