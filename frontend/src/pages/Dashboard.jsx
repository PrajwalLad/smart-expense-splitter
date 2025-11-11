import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoIosAddCircleOutline } from "react-icons/io";
import {TiTick} from "react-icons/ti"
import DashboardCard from "../components/DashboardCard";
import { AuthContext } from "../context/AuthContext";
import SummaryTables from "../components/SummaryTables";
import API from "../api/axios";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [summary, setSummary] = useState({});
  const getSummary = async () => {
    try {
      const res = await API.get("/expense", {
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
          <div className="flex flex-col md:flex-row gap-4 md:gap-10">
            <button className="flex items-center cursor-pointer bg-sky-500 rounded-lg px-3 py-2 text-white hover:bg-sky-600 shadow transition gap-1.5">
              <IoIosAddCircleOutline size={19} /> Add expense
            </button>
            <button className="flex items-center justify-center cursor-pointer rounded-lg bg-emerald-700 px-3 py-2 text-white hover:bg-emerald-800 shadow transition gap-1.5">
              <TiTick size={19}/> Settle up
            </button>
          </div>
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
        <SummaryTables />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
