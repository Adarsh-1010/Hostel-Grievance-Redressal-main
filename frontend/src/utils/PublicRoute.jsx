import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";

const PublicRoute = ({ children }) => {
  const { authToken } = useAuth();

  return authToken ? <Navigate to="/" /> : children;
};

export default PublicRoute; 