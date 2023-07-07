import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { APPRoute } from "../../const";

const ProtectedRoute = ({ authUser }: { authUser: string | boolean }) => {
  if (!authUser) {
    return <Navigate to={APPRoute.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
