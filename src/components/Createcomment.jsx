import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../components/contexts/authContext";

export default function Createcomment({ postId, getPosts, getComments, editingComment, onCancelEdit }) {
  const { UserToken } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editContent, setEditContent] = useState("");

  async function handleComment(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      const formData = new FormData();
      formData.append("content", comment);
      if (image) formData.append("image", image);

      await axios.post(
        `https://route-posts.routemisr.com/posts/${postId}/comments`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${UserToken}`
          },
        }
      );

      setComment("");
      setImage(null);
      setPreview(null);
      if (getPosts) await getPosts();
      if (getComments) await getComments();
    } catch (error) {
      console.log(error.response?.data || error);
    }
  }

  async function updateComment() {
    if (!editContent.trim()) return;
    try {
      const formData = new FormData();
      formData.append("content", editContent);

      await axios.put(
        `https://route-posts.routemisr.com/posts/${postId}/comments/${editingComment._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${UserToken}`
            
          },
        }
      );
      onCancelEdit(); 
      if (getComments) await getComments();
    } catch (error) {
      console.log(error.response?.data || error);
    }
  }


   useEffect(() => {
     if (editingComment) {
    setEditContent(editingComment.content);
   }
     }, [editingComment]);


 return (
  <>
    {editingComment ? (
      /* Edit Comment Form */
      <div className="flex gap-2 mb-3">
        <input
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="flex-1 pt-2 pb-2 pl-3 bg-slate-100 rounded-lg"
          type="text"
        />
        <button
          onClick={updateComment}
          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
        >
          Save
        </button>
        <button
          onClick={onCancelEdit}
          className="text-gray-500 px-3 py-1 rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    ) : (
      /* Create Comment Form */
      <form onSubmit={handleComment} className="relative space-y-3">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 rounded-lg"
          type="text"
          placeholder="Write a comment"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;
            setImage(file);
            setPreview(URL.createObjectURL(file));
          }}
        />

        {preview && (
          <img src={preview} alt="preview" className="w-40 h-40 object-cover rounded-lg" />
        )}

        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full hover:bg-blue-100 transition"
        >
          <svg className="fill-blue-500 w-5 h-5" viewBox="0 0 24 24">
            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
          </svg>
        </button>
      </form>
    )}
  </>
);}