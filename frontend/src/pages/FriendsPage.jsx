import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import FriendCard from "../components/FriendCard";
import PageLoader from "../components/PageLoader";

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axiosInstance.get("/users/friends");
        setFriends(res.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Your Friends</h1>

      {friends.length === 0 ? (
        <p className="text-gray-500">You have no friends yet 😅</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
