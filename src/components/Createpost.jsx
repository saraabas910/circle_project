import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../components/contexts/authContext";

export default function CreatePost({ getPosts }) {
  const { UserToken } = useContext(AuthContext);

  const [body, setBody] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("body", body);

      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(
        "https://route-posts.routemisr.com/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${UserToken}`
          },
        }
      );
          getPosts();

      setBody("");
      setImage(null);
      setPreview(null);
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  }

  function removeImage() {
    if (preview) URL.revokeObjectURL(preview);
     
    setImage(null);
    setPreview(null);


  }
   





  return (
    <div className="bg-white rounded-xl shadow p-4">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full text-left bg-gray-100 rounded-lg px-4 py-3 text-gray-500"
        >
          What's on your mind?
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit}>
          {/* Caption */}
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full resize-none border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
          />

          {/* Photo */}
          <button
            type="button"
            className="flex items-center gap-2 text-gray-600 hover:text-black mb-4"
            onClick={() => document.getElementById("fileUpload").click()}
          >
            📷 <span>Photo</span>
          </button>

          {/* Input file  */}
          <input
            id="fileUpload"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files[0];

              if (!file) return;

              setImage(file);
              setPreview(URL.createObjectURL(file));
            }}
          />

          {/* Preview  */}
          {preview && (
            <div className="relative mb-4 w-full flex justify-center">
              <img
                src={preview}
                alt="preview"
                className="w-full max-h-72 object-contain rounded-lg"
              />

              <button
                type="button"
                onClick={removeImage}
                className="absolute top-1 right-1 bg-white rounded-full px-2 shadow text-red-500"
              >
                ✕
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-black"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!body.trim()}
                className="bg-blue-500 text-white px-5 py-2 rounded-lg disabled:opacity-50"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}