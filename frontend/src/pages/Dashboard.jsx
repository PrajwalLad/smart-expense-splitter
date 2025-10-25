import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoIosAddCircleOutline } from "react-icons/io";
import DashboardCard from "../components/DashboardCard";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [summary, setSummary] = useState({});
  const getSummary = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/expense", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummary(res.data);
    } catch (error) {
      console.error("Error getting summary: ", error);
    }
  };
  useEffect(() => {
    getSummary();
  }, []);

  const youOwe = summary?.data?.youOwe;
  const owedToYou = summary?.data?.owedToYou;

  return (
    <>
      <Navbar />
      <div className="bg-sky-100 flex flex-col px-7 sm:px-10 py-10 gap-18">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-cyan-700">Dashboard</h1>
          <button className="flex items-center cursor-pointer bg-sky-500 rounded-lg px-3 py-2 text-white hover:bg-sky-600 shadow transition gap-1.5">
            <IoIosAddCircleOutline size={19} /> Add expense
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7 place-items-center">
          {youOwe > owedToYou ? (
            <DashboardCard
              cardTitle="Total balance"
              amount={`-₹${youOwe - owedToYou || 0}`}
            />
          ) : owedToYou > youOwe ? (
            <DashboardCard
              cardTitle="Total balance"
              amount={`+₹${owedToYou - youOwe || 0}`}
            />
          ) : (
            <DashboardCard cardTitle="Total balance" amount={`₹0`} />
          )}
          <DashboardCard cardTitle="You owe" amount={youOwe || 0} />
          <DashboardCard cardTitle="Owed to you" amount={owedToYou || 0} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-8">
          {/*Friend Summary table*/}
          <div
            className="friendSummary flex flex-col w-74 sm:w-80 lg:w-96 gap-2.5 rounded-xl 
            bg-gradient-to-r from-cyan-400 to-cyan-300 text-gray-700 px-5 pt-7 pb-3 shadow-lg hover:shadow-2xl hover:scale-105 hover:brightness-105 transform 
            transition-all duration-300 ease-in-out text-lg font-bold relative"
          >
            <h2 className="text-center">Friends</h2>
            <span className="absolute right-1.5 top-1 text-sm cursor-pointer hover:underline text-blue-800">
              Manage friends
            </span>
            <div className="total flex justify-between px-2">
              <h3 className="">Total</h3>
              <span>50</span>
            </div>
            <div className="youOwe flex flex-col">
              <h3 className="text-rose-700">You owe</h3>
              <p className="flex justify-between">
                <span>Friend 1</span>
                <span>100</span>
              </p>
            </div>
            <div className="owedToYou flex flex-col">
              <h3 className="text-emerald-800">Owed to you</h3>
              <p className="flex justify-between">
                <span>Friend 2</span>
                <span>20</span>
              </p>
              <p className="flex justify-between">
                <span>Friend 3</span>
                <span>30</span>
              </p>
            </div>
          </div>

          {/*Group Summary table*/}

          <div
            className="groupSummary flex flex-col w-74 sm:w-80 lg:w-96 gap-2.5 rounded-xl 
            bg-gradient-to-r from-cyan-400 to-cyan-300 text-gray-700 px-5 pt-7 pb-3 shadow-lg hover:shadow-2xl hover:scale-105 hover:brightness-105 transform 
            transition-all duration-300 ease-in-out text-lg font-bold relative"
          >
            <h2 className="text-center">Groups</h2>
            <span className="absolute right-1.5 top-1 text-sm cursor-pointer hover:underline text-blue-800">
              Manage groups
            </span>
            <div className="total flex justify-between px-2">
              <h3 className="">Total</h3>
              <span>30</span>
            </div>
            <div className="youOwe flex flex-col">
              <h3 className="text-rose-700">You owe</h3>
              <p className="flex justify-between">
                <span>Group 1</span>
                <span>100</span>
              </p>
            </div>
            <div className="owedToYou flex flex-col">
              <h3 className="text-emerald-800">Owed to you</h3>
              <p className="flex justify-between">
                <span>Group 1</span>
                <span>40</span>
              </p>
              <p className="flex justify-between">
                <span>Group 2</span>
                <span>30</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
