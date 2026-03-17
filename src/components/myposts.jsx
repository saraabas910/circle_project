import { useEffect, useState } from "react";
import axios from "axios";  

export function MyPosts({ userId , UserToken, Userphoto, setPosts}) {
  const [localposts, setlocalPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function FetchMyPosts() {
    const UserToken = localStorage.getItem("token")?.trim();
    if (!UserToken) return;

    try {
      const res = await axios.get(
        `https://route-posts.routemisr.com/users/${userId}/posts`,
        {
          headers: { Authorization: `Bearer ${UserToken}` },
        }
      );
      setlocalPosts(res.data.data.posts || []);
         setPosts(res.data.data.posts || []);
      console.log("User posts:", res.data.data.posts);
    } catch (err) {
      console.error("Failed to fetch posts:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    FetchMyPosts();
  }, [UserToken]);

  return (
    <div className="mt-8">
      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow p-4 mb-6 flex justify-between items-center">
        <div className="flex gap-4">
          <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg">
            My Posts
          </button>
          <button className="text-gray-500 px-4 py-2">
            Saved
          </button>
        </div>
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
          {localposts.length}
        </span>
      </div>

      {/* Post Cards */}
      <div>
        {localposts && localposts.map((localpost) => (
          <div key={localpost._id} className="bg-white rounded-2xl shadow p-6 mb-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <img
                  src={Userphoto || "https://i.pravatar.cc/50"}
                  className="w-12 h-12 rounded-full"
                  alt="avatar"
                />
                <div>
                  <h3 className="font-semibold">{localpost.user?.name}</h3>
                  <p className="text-gray-500 text-sm">{localpost.user?.username}</p>
                </div>
              </div>
              <button className="text-blue-500 text-sm">View details</button>
            </div>

            {/* content */}
            <p className="mt-4 text-gray-700">{localpost.body}</p>

            {/* footer */}
            <div className="flex justify-between mt-6 text-gray-500 text-sm">
              <div className="flex gap-6">
                <span>👍{localpost.likes.length} </span>
                <span>🔁{localpost.sharesCount}</span>
                <span>💬{localpost.commentsCount}</span>
              </div>
              <span>{new Date(localpost.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}