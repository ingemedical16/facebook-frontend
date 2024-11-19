import { FC, useEffect, useState } from "react";
import Login from "../../components/Auth/login/Login";
import Footer from "../../components/Auth/footer/Footer";
import Register from "../../components/Auth/register/Register";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";

const LoginPage: FC = () => {
  const { user } = useSelector(
    (state: RootState) => state.auth
  );
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]); 

  return (
    <div>
      <Login setVisible={setVisible} />
      {visible && <Register setVisible={setVisible} />}
      <Footer />
    </div>
  );
};

export default LoginPage;
