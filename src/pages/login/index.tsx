import { FC, useState } from "react";
import Login from "../../components/Auth/login/Login";
import Footer from "../../components/Auth/footer/Footer";
import Register from "../../components/Auth/register/Register";



const LoginPage: FC = () => {

  const [visible, setVisible] = useState(false);
  


  return (
    <div>
      <Login setVisible={setVisible} />
      {visible && <Register setVisible={setVisible} />}
      <Footer />
    </div>
  );
};

export default LoginPage;
