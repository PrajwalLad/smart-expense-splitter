import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { CgProfile } from "react-icons/cg";
import { FaAngleDown } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const {user, logout} = useContext(AuthContext);
  
  return (
    <div className="flex justify-between items-center px-3 sm:px-8 md:px-12 py-6 bg-gradient-to-r from-sky-300 via-sky-400 to-sky-200 shadow-md">
      <Logo />
      {user ? (
        <>
          <span className="flex items-center gap-1.5 text-sky-950 bg-sky-100 rounded-xl px-2.5 py-1 cursor-pointer">
            <CgProfile size={27} />
            {user.name ?? user.email}
            <FaAngleDown/>
          </span>
        </>
      ) : (
        <div className="flex items-center gap-3 sm:gap-6 text-base sm:text-lg">
          <Link to="/login">
            <button className="cursor-pointer text-sky-900 hover:underline">
              Log in
            </button>
          </Link>
          <Link to="/signup">
            <button className="cursor-pointer bg-sky-500 rounded-lg px-4 py-2 text-white hover:bg-sky-600 shadow transition">
              Sign up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
