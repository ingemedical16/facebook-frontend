import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Outlet,Navigate } from "react-router-dom";
import { FC } from "react";
import LoginPage from "../pages/login";

const LoggedInRoutes: FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return user ? <Outlet /> : <LoginPage />;
};

export default LoggedInRoutes;
