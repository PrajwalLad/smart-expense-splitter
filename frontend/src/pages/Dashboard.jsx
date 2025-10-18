import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoIosAddCircleOutline} from "react-icons/io"

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-sky-100 flex flex-col px-7 sm:px-10 py-10 gap-4">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-semibold text-cyan-700">
            Dashboard
          </span>
          <button className="flex items-center cursor-pointer bg-sky-500 rounded-lg px-3 py-2 text-white hover:bg-sky-600 shadow transition gap-1.5">
            <IoIosAddCircleOutline size={19} /> Add expense
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <div></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
