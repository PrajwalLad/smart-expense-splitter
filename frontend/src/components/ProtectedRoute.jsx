import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
  const { token, decodedUser } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if(decodedUser && !decodedUser.isOnboarded){
    return <Navigate to="/onboarding" replace />;
  }
  return children;
};

export default ProtectedRoute;
