import React, { useState } from "react";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        email, password
      });
      localStorage.setItem("token", res.data.token);
      toast.success(res.data.message);
      setTimeout(()=> navigate("/groups"), 1500)
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-sky-300 to-sky-200">
        <main className="flex flex-grow justify-center items-center">
          <div className="flex flex-col gap-4 items-center shadow-2xl bg-sky-100 rounded-lg px-5 py-4 w-84">
            <Logo />
            <h2 className="text-lg sm:text-xl md:text-xl text-slate-600">
              Log In
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 text-slate-800 text-md sm:text-lg md:text-lg w-full"
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="input">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="border rounded-lg px-2 py-1 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="input">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className="border-1 rounded-lg px-2 py-1 focus:outline-none w-full"
                />
              </div>
              <button className="cursor-pointer bg-sky-500 rounded-lg px-4 py-2 text-white hover:bg-sky-600 shadow transition">
                Log In
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Login;
