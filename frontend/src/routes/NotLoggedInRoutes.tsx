import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Outlet,Navigate } from "react-router-dom";
import { FC } from "react";


const LoggedInRoutes: FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default LoggedInRoutes;
