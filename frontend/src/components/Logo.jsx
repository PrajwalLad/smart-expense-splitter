import React from "react";
import { SlWallet } from "react-icons/sl";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/"><div className="logo cursor-pointer flex gap-1 items-center text-sky-900 font-bold text-lg sm:text-xl md:text-2xl tracking-wide">
      <SlWallet className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9" />
      <span>Splitter</span>
    </div>
    </Link>
  );
};

export default Logo;
