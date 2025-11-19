import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { IoIosAddCircleOutline } from "react-icons/io";
import API from "../api/axios";
import { FaArrowRight } from "react-icons/fa";

const Friends = () => {
  const { token } = useContext(AuthContext);
  const [friendArr, setFriendArr] = useState([]);
  const listFriends = async () => {
    try {
      const resFriends = await API.get("expense/friends", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFriendArr(resFriends.data.data.friends);
    } catch (error) {
      console.log("Error in fetching friends: ", error);
    }
  };
  useEffect(() => {
    listFriends();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col bg-gradient-to-r from-sky-300 via-sky-400 to-sky-300 rounded-xl   my-20 mx-5 md:mx-52 px-4 md:px-10 py-5 items-center text-gray-900 gap-8 shadow-2xl">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-2xl md:text-2xl font-semibold ">Friends</h2>
          <button className="flex items-center gap-1 transition-all delay-75 bg-emerald-700 hover:bg-emerald-800 rounded-lg px-2 py-1 cursor-pointer text-white">
            <IoIosAddCircleOutline className="size-6" />
            Add friend
          </button>
        </div>
        <div className="flex flex-col gap-3 w-full md:w-3/4">
          {friendArr.length === 0 ? (
            <span className="">You do not have any friends yet.</span>
          ) : (
            friendArr.map((friend) => (
              <div
                key={friend.friendId}
                className="flex flex-row items-center justify-between transition-all delay-75 hover:scale-[1.02] bg-sky-100 px-5 md:px-8 py-2 rounded-lg cursor-pointer w-full"
              >
                <div className="md:flex items-center w-1/2 justify-between md:pr-18">
                  <h5 className="font-semibold text-lg">{friend.name}</h5>
                  {friend.youOwe > friend.owedToYou ? (
                    <span className="text-rose-700 font-semibold">-₹{friend.youOwe - friend.owedToYou}</span>
                  ) : (
                    <span className="text-green-900 font-semibold">+₹{friend.owedToYou - friend.youOwe}</span>
                  ) }
                </div>
                <FaArrowRight className="size-5" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
