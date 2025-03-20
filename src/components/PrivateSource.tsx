import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// Define Props Type
interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to='/' />;
};

export default PrivateRoute;
