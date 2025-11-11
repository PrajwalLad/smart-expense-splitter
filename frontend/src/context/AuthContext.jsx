import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import API from '../api/axios.js'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/getUser", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    if (decodedUser && token) {
      fetchUser();
    } else {
      setLoading(false);
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
    setUser(null)
  };

  return (
    <AuthContext.Provider value={{ token, decodedUser, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
