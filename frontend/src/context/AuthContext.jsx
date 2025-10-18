import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [decodedUser, setDecodedUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedUser(decoded);
      } catch (err) {
        console.error("Invalid token");
        setToken(null);
        setDecodedUser(null);
        localStorage.removeItem("token");
      }
    } else {
      setDecodedUser(null);
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/getUser", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        logout();
      }
    };

    if (decodedUser && token) {
      fetchUser();
    }
  }, [decodedUser, token]);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setDecodedUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, decodedUser, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
