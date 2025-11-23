import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { IoCreateOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Groups = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [groupArr, setGroupArr] = useState([]);
  const listGroups = async () => {
    try {
      const resGroups = await API.get("groups", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroupArr(resGroups.data.data);
    } catch (error) {
      console.log("Error in fetching groups: ", error);
    }
  };
  useEffect(() => {
    listGroups();
  }, []);
  
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col bg-gradient-to-r from-sky-300 via-sky-400 to-sky-300 rounded-xl   my-20 mx-5 lg:mx-52 px-4 lg:px-10 py-5 items-center text-gray-900 gap-8 shadow-2xl">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-2xl  font-semibold ">Groups</h2>
          <button className="flex items-center gap-1 transition-all delay-75 bg-emerald-700 hover:bg-emerald-800 rounded-lg px-2 py-1 cursor-pointer text-white">
            <IoCreateOutline className="size-6" />
            Create group
          </button>
        </div>
        <div className="flex flex-col gap-3 w-full md:w-3/4">
          {groupArr.length === 0 ? (
            <span className="">You do not have any groups yet.</span>
          ) : (
            groupArr.map((group) => (
              <div
                key={group._id} onClick={()=>(navigate(`/groups/${group._id}`))} 
                className="flex flex-row items-center justify-between transition-all delay-75 hover:scale-[1.02] bg-sky-100 px-5 md:px-8 py-2 rounded-lg cursor-pointer w-full"
              >
                <div className="md:flex items-center w-1/2 justify-between md:pr-18">
                  <h5 className="font-semibold text-lg">{group.name}</h5>
                  <span className="text-gray-700">
                    <span>{group.users.length + 1}</span> People
                  </span>
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

export default Groups;
