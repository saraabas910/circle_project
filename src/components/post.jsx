import { Link } from "react-router-dom";
import commentIcon from "/src/assets/comment-svgrepo-com.svg";
import Createcomment from "./Createcomment";
import axios from "axios";
import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../components/contexts/authContext";

export default function Post({ post, getPosts }) {
  const { UserToken, userData } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState(post.body);
  const [editingComment, setEditingComment] = useState(null);


  async function getComments() {
    try {
      const { data } = await axios.get(
        `https://route-posts.routemisr.com/posts/${post._id}/comments?page=1&limit=10`,
        { headers: { Authorization: `Bearer ${UserToken}` } }
      );
      /*console.log("comments", data)*/
      setComments(data.data.comments || []);
    } catch (error) {
      console.log(error.response?.data || error);
    }
    
  }
   
  useEffect(() => {
    if (post?._id)
       getComments();
  }, [post._id]);

  

  async function deletePost() {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(
        `https://route-posts.routemisr.com/posts/${post._id}`,
        { headers: { Authorization: `Bearer ${UserToken}` } }
      );
      getPosts();
    } catch (error) {
      console.log(error.response?.data);
    }
  }

  async function updatePost() {
    try {
      await axios.put(
        `https://route-posts.routemisr.com/posts/${post._id}`,
        { body: editBody },
        { headers: { Authorization: `Bearer ${UserToken}` } }
      );
      setIsEditing(false);
      getPosts();
    } catch (error) {
      console.log(error.response?.data || error);
    }
  }

  async function deleteComment(commentId) {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await axios.delete(
        `https://route-posts.routemisr.com/posts/${post._id}/comments/${commentId}`,
        { headers: { Authorization: `Bearer ${UserToken}` } }
      );
      getComments();
    } catch (error) {
      console.log(error.response?.data || error);
    }
  }

 
  return (
    <article className="mb-4 p-6 rounded-xl bg-gray-100 dark:bg-slate-800 flex flex-col">

      {/* Post Header */}
      <div className="flex pb-6 items-center justify-between">
        <div className="flex">
          <img className="rounded-full w-12 h-12 mr-4" src={post.user.photo} />
          <div className="flex flex-col">
            <span className="text-lg font-bold dark:text-white">{post.user.name}</span>
            <span className="text-slate-500 text-sm">
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        {post.user._id === userData?._id && (
          <div className="flex gap-2">
            <button onClick={deletePost} className="text-red-500 hover:text-red-700 text-sm">
              Delete
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-500 hover:text-blue-700 text-sm" >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>
        )}
      </div>

      {/* Edit Pst */}
      {isEditing ? (
        <div className="flex flex-col gap-2 pb-4">
          <textarea
            className="border rounded-lg p-3 dark:bg-slate-700 dark:text-white resize-none"
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            rows={3}
          />
          <button
            onClick={updatePost}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      ) : (
        <h2 className="text-3xl font-extrabold dark:text-white">{post.body}</h2>
      )}

      {post.image && (
        <div className="py-4">
          <img className="w-full max-h-72 object-contain rounded-lg" src={post.image} />
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

      {/* Create Comment /////////*/}
     <Createcomment
        postId={post._id}
          getPosts={getPosts}
              getComments={getComments}
                editingComment={editingComment}
                  onCancelEdit={() => setEditingComment(null)}/>

      {/* Comments List */}
      <div className="pt-6">
        {comments.map((comment) => (
          <div key={comment._id} className="flex pb-4 gap-4">
            <img className="rounded-full w-12 h-12" src={comment.commentCreator.photo} />
            <div>
              <div className="font-bold">{comment.commentCreator.name}</div>
             <p className="break-all">{comment.content}</p>
              {comment.commentCreator._id === userData?._id && (
                  <div className="flex gap-2 mt-1">
              <button onClick={() => setEditingComment(comment)} className="text-blue-500 text-sm">  Edit</button>


                 <button
                 onClick={() => deleteComment(comment._id)}
                  className="text-red-500 text-sm" >   Delete </button>
                   </div>)}  
                   </div>
            </div>
        ))}
      </div>

      <Link
        to={`/posts/${post._id}`}
        className="py-3 block bg-slate-100 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200"
      >
        Show more comments
      </Link>

    </article>
  );
}