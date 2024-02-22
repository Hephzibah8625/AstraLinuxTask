import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedViews = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth?.login
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
  ); 
};

export default ProtectedViews;
