import React from "react";
import { SlWallet } from "react-icons/sl";

const Footer = () => {
  return (
    <footer className="flex flex-col text-center py-4 bg-sky-100">
      <span className="text-slate-700">© 2025 Splitter</span>
      <span className="font-bold">
        Made with ❤️ by{" "}
        <a href="https://www.linkedin.com/in/prajwal-lad/" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">PRAJWAL</a>
      </span>
    </footer>
  );
};

export default Footer;
