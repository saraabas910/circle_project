import { useContext ,useEffect, useState } from "react";
import { AuthContext } from "./contexts/authContext";
import axios from "axios";
import { MyPosts } from "./myposts";




export function ProfileCard() {
  const UserToken = localStorage.getItem("token")?.trim();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  async function FetchMydata() {
    try {
      const res = await axios.get("https://route-posts.routemisr.com/users/profile-data", {
        headers: { Authorization: `Bearer ${UserToken}` }
      });
      setUser(res.data.data.user);
    } catch (err) {
      console.error("Failed to fetch user:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!UserToken) return;
    FetchMydata();
  }, [UserToken]);

  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Failed to load profile.</div>;



  return ( <div> 
    <div className="bg-white rounded-3xl shadow-lg p-8 -mt-20">

      <div className="flex items-center justify-between flex-wrap">

        <div className="flex items-center gap-4">
          <img
            src={user?.photo}
            className="w-24 h-24 rounded-full border-4 border-white"
            alt="profile"
          />

          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-gray-500">{user?.username}</p>

          
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mt-4 md:mt-0">

          <div className="bg-gray-100 rounded-xl p-4 text-center w-28">
            <p className="text-gray-500 text-sm">Followers</p>
            <h3 className="text-xl font-bold">{user?.followers?.length}</h3>
          </div>

          <div className="bg-gray-100 rounded-xl p-4 text-center w-28">
            <p className="text-gray-500 text-sm">Following</p>
            <h3 className="text-xl font-bold">{user?.following?.length}</h3>
          </div>

          <div className="bg-gray-100 rounded-xl p-4 text-center w-28">
            <p className="text-gray-500 text-sm">Bookmarks</p>
            <h3 className="text-xl font-bold">{user?.bookmarks?.length}</h3>
          </div>

        </div>

      </div>

      {/* About */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-3">About</h3>
          <p className="text-gray-600">{user?.email}</p>
          
        </div>

        <div className="flex flex-col gap-4">

          <div className="bg-gray-50 p-6 rounded-xl">
            <p className="text-gray-500 text-sm">My Posts</p>
            <h3 className="text-xl font-bold">{posts.length}</h3>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <p className="text-gray-500 text-sm">Saved Posts</p>
            <h3 className="text-xl font-bold">0</h3>
          </div>

        </div>

      </div>

    </div>
  {user?._id && <MyPosts userId={user._id} UserToken={UserToken} Userphoto={user?.photo}  setPosts={setPosts} />}
     </div>
    
  );
  }
