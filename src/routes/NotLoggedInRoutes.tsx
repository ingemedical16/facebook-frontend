import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Outlet, Navigate } from "react-router-dom";
import { FC } from "react";

const NotLoggedInRoutes: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default NotLoggedInRoutes;
