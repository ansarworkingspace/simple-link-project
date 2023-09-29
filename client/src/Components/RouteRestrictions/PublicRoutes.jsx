import React from "react";

import useAuth from "../../util/AuthUser";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const isLoggedIn = useAuth();
  return isLoggedIn ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoutes;