import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AppDispatch, RootState } from "../../app/store";
import { logout } from "../../features/slices/auth/authSlice";
import SearchAccount from "./searchAccount";
import SendEmail from "./sendEmail";
import CodeVerification from "./codeVerification";
import ChangePassword from "./changePassword";
import Footer from "../Auth/footer/Footer";
import styles from "./Reset.module.css";



const Reset: React.FC = () => {
  const  user  = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [visible, setVisible] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [conf_password, setConfPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [userInfos, setUserInfos] = useState<any>("");

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={styles.reset}>
      <div className={styles.reset_header}>
        <img src="/icons/facebook.svg" alt="Facebook" />
        {user ? (
          <div className={styles.right_reset}>
            <Link to="/profile">
              <img src={user?.picture} alt="User profile" />
            </Link>
            <button className="btn btn-primary" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className={styles.right_reset}>
            <button className="btn btn-primary">Login</button>
          </Link>
        )}
      </div>
      <div className={styles.reset_wrap}>
        {visible === 0 && (
          <SearchAccount
            setEmail={setEmail}
            loading={loading}
            setError={setError}
            setLoading={setLoading}
            setUserInfos={setUserInfos}
            setVisible={setVisible}
          />
        )}
        {visible === 1 && userInfos && (
          <SendEmail
            email={email}
            userInfos={userInfos}
            loading={loading}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setUserInfos={setUserInfos}
            setVisible={setVisible}
          />
        )}
        {visible === 2 && (
          <CodeVerification
            email={email}
            loading={loading}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
            userInfos={userInfos}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            loading={loading}
            password={password}
            conf_password={conf_password}
            setConf_password={setConfPassword}
            setPassword={setPassword}
            error={error}
            setError={setError}
            setLoading={setLoading}
            userInfos={userInfos}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Reset;
