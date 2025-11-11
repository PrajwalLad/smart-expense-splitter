import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { CgProfile } from "react-icons/cg";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import API from "../api/axios";

const Profile = () => {
  const { user, token } = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState(0);
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    if (user?.name) setFullName(user.name);
    if (user?.email) setEmail(user.email);
    if (user?.contact_no) setContact(user.contact_no);
  }, [user]);

  const handleSave = async () => {
    try {
      console.log(token);
      const resUpdate = await API.patch(
        "/update",
        { name: fullName, email, contact_no: contact },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(resUpdate);
      toast.success(resUpdate.data.message);
      setEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
      console.log("Error in updating user: ", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col px-5 py-10">
        <div
          className={`flex flex-col bg-gradient-to-r from-sky-300 via-sky-400 to-sky-300 rounded-xl px-5 py-5 items-center w-full max-w-sm mx-auto mt-20 md:mt-0 shadow-2xl gap-5 md:gap-8 text-gray-900 relative transition-all duration-300 ${
            editing ? "scale-[1.02] shadow-3xl" : "scale-100"
          }`}
        >
          <button
            className="absolute right-2 top-1.5 cursor-pointer hover:underline text-sm md:text-lg text-blue-900 font-semibold"
            onClick={() => setEditing(true)}
          >
            edit
          </button>
          <div className="flex items-center gap-6">
            <CgProfile className="size-20 md:size-28" />
            <span
              className={`transition-all duration-300 ${
                editing
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-1 pointer-events-none"
              } hover:underline cursor-pointer md:text-lg`}
            >
              Change profile
            </span>
          </div>
          <div className="flex font-semibold gap-2 text-lg md:text-xl items-center justify-between w-full">
            <h2>Name</h2>
            <input
              className="bg-gray-300 rounded-lg px-2 py-1 w-fit focus:outline-none focus:ring-1 focus:ring-gray-700 transition-all duration-300"
              value={fullName}
              readOnly={!editing}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="flex font-semibold gap-2 text-lg md:text-xl items-center justify-between w-full">
            <h2>Email</h2>
            <input
              className="bg-gray-300 rounded-lg px-2 py-1 w-fit focus:outline-none focus:ring-1 focus:ring-gray-700 transition-all duration-300"
              type="email"
              value={email}
              readOnly={!editing}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex font-semibold gap-2 text-lg md:text-xl items-center justify-between w-full">
            <h2>Contact</h2>
            <input
              className="bg-gray-300 rounded-lg px-2 py-1 w-fit focus:outline-none focus:ring-1 focus:ring-gray-700 transition-all duration-300"
              value={contact}
              maxLength={10}
              readOnly={!editing}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div
            className={`flex items-center justify-between w-full transform transition-all duration-300 ${
              editing
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <button
              className="bg-gray-300 rounded-lg px-2 py-1 font-semibold cursor-pointer md:text-xl"
              onClick={() => {
                setEditing(false);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-gray-300 rounded-lg px-2 py-1 font-semibold cursor-pointer md:text-xl"
              onClick={() => {
                handleSave();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
