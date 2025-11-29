import React, { useContext } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import Card from "../components/ReviewCard"
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";

const Homepage = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <div className="flex flex-col bg-gradient-to-r from-sky-300  to-sky-200 min-h-screen gap-5">
        {/* Hero section */}
        <div className="flex flex-col sm:flex-row md:flex-row items-center justify-center gap-10 px-10 py-7 md:px-24 md:py-15">
          <div className="left flex justify-center rounded-2xl overflow-hidden">
            <img src="homepage.webp" alt="friend-group-image" width={"600px"} />
          </div>
          <div className="right flex flex-col justify-center items-center text-center gap-2">
            <p className="text-xl sm:text-2xl md:text-2xl text-slate-900 font-bold">
              Split payments easily with{" "}
              <span className="text-cyan-600">friends and family</span>
            </p>
            <p className="text-sm text-gray-700 mb-1">
              Easily track shared expenses, settle up instantly, and keep your
              group finances transparent and hassle-free.
            </p>
            {!user ? (
              <Link to="/signup">
                <button className="flex items-center cursor-pointer bg-sky-500 rounded-lg px-3 py-2 text-white hover:bg-sky-600 shadow transition">
                  Get started
                  <FaArrowCircleRight className="ml-2" />
                </button>
              </Link>
            ) : !user.isOnboarded ? (
              <div className="flex flex-col items-center gap-5">
                <p className="text-md text-gray-700 font-semibold">
                  You are just 1 step away from completing
                </p>
                <Link to="/onboarding">
                  <button className="flex items-center cursor-pointer bg-sky-500 rounded-lg px-4 py-2 text-white hover:bg-sky-600 shadow transition">
                    Complete your setup
                    <FaArrowCircleRight className="ml-2" />
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/dashboard">
                  <button className="flex items-center cursor-pointer bg-sky-500 rounded-lg px-4 py-2 text-white hover:bg-sky-600 shadow transition">
                    Go to dashboard
                    <FaArrowCircleRight className="ml-2" />
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* reviews */}
        <div className="flex flex-col items-center justify-center gap-3 md:gap-5 mb-3">
          <h2 className="text-lg font-bold text-slate-900">
            Reviews by Our Users
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <Card />
            <Card
              name="Rugved"
              profession="SAP Developer"
              review="This app is great! It helps manage bills of my large friend group.."
            />
            <Card
              name="Vinayak"
              profession="ERP Applications"
              review="The developer of this app have solved the biggest problem, before this I was manually calculating for my group and now app has the intelligence"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
