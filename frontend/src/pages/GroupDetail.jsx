import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FaArrowLeft } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const GroupDetail = () => {
  const [groupInfo, setGroupInfo] = useState({})
  const {id} = useParams();
  const {token} = useContext(AuthContext);
  const fetchGroup = async () => {
    try {
      const resDetails = await API.get(`groups/${id}`, {headers: {Authorization: `Bearer ${token}`}});
      console.log(resDetails);
      setGroupInfo(resDetails.data.group)
    } catch (error) {
      console.log(id);
      console.log("Error in fetching group details: ", error);
    }
  };
  useEffect(()=>{
    fetchGroup();
  }, [])
  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-2 bg-neutral-200 border border-neutral-400 shadow-xl mx-5 md:mx-52 my-20 px-4 md:px-10 pt-10 py-5 rounded-xl relative">
        <button className="flex items-center gap-4 absolute left-2.5 top-1 cursor-pointer">
          <FaArrowLeft /> Groups
        </button>
        <h2 className="text-2xl text-sky-900 font-semibold text-center">{groupInfo?.name}</h2>
        <div className="flex justify-between items-center">
          <span className="text-gray-700 md:text-lg">Group members: {groupInfo?.users?.length + 1}</span>
          <button className="text-sky-900 md:text-lg cursor-pointer" >View members</button>
        </div>
        <div className="bg-gray-500 h-0.5"/>
        
      </div>
    </div>
  );
};

export default GroupDetail;
