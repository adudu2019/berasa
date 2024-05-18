import React from "react";
import { useAuth } from "./AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function AuthRoute() {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/Login"} replace state={{ path: location.pathname }} />
  );
}

export default AuthRoute;
