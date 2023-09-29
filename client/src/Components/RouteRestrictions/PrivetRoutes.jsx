import React from "react";

import useAuth from "../../util/AuthUser";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const isLoggedIn = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;