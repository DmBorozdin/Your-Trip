import { Navigate, Outlet } from "react-router-dom";
import { APPRoute } from "../../const";
import { useSelector } from "react-redux";
import { getAuthUserId } from "../../store/users/selector";

const ProtectedRoute = () => {
  const authUser = useSelector(getAuthUserId);
  if (!authUser) {
    return <Navigate to={APPRoute.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
