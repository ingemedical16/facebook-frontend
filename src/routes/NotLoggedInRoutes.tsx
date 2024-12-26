import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Outlet, Navigate } from "react-router-dom";
import { FC } from "react";

const NotLoggedInRoutes: FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default NotLoggedInRoutes;
