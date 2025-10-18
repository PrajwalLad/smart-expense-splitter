import React from "react";
import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile"
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
