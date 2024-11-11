import { FC } from "react";
import Login from "../../components/Auth/login/Login"; // Correct import statement
import Footer from "../../components/Auth/footer/Footer";
import Register from "../../components/Auth/register/Register";

const LoginPage: FC = () => {
  return (
    <div>
      <Login />
      <Register/>
      <Footer />
    </div>
  )
};

export default LoginPage;
