import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import { CgProfile } from "react-icons/cg";

const Onboarding = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setEmail(decoded.email);
      } catch (error) {
        console.error("Invalid token ", error);
      }
    }
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-sky-300 to-sky-200">
        <main className="flex flex-grow justify-center items-center">
          <div className="flex flex-col gap-3 items-center shadow-2xl bg-sky-100 rounded-lg px-5 py-4 w-full mx-5 md:mx-48">
            <Logo />
            <h2 className="text-lg sm:text-xl md:text-xl text-slate-600">
              Complete your details
            </h2>
            <div className="flex items-center gap-2 text-slate-600 md:gap-7">
              <CgProfile size={35} className="md:size-12" />
              <span className="text-cyan-950 font-semibold hover:underline hover:cursor-pointer">
                Edit profile
              </span>
            </div>
            <form className="flex flex-col gap-2 text-slate-800 text-md sm:text-lg md:text-lg w-full">
              <div className="flex flex-col gap-1">
                <label htmlFor="input">Email</label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="border rounded-lg px-2 py-1 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="input">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border-1 rounded-lg px-2 py-1 focus:outline-none w-full"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="input">Mobile no.</label>
                <input
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                  className="border-1 rounded-lg px-2 py-1 focus:outline-none w-full"
                />
              </div>
              <button
                type="submit"
                className="cursor-pointer bg-sky-500 rounded-lg px-4 py-2 text-white hover:bg-sky-600 shadow transition mx-auto"
              >
                Submit
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Onboarding;
