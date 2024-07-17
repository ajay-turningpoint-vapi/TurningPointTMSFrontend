import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/auth/404" />;
  }
  if (user.role === "TeamLeader") {
    return <Navigate to="/teamleader-dashboard" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
