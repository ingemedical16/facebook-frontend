import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { sendResetPasswordCode } from "../../../features/function";
import styles from "../Reset.module.css";

interface UserInfos {
  email: string;
  picture: string;
}

interface SendEmailProps {
  userInfos: UserInfos;
  email: string;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setVisible: React.Dispatch<React.SetStateAction<number>>;
  setUserInfos: React.Dispatch<React.SetStateAction<UserInfos>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SendEmail: React.FC<SendEmailProps> = ({
  userInfos,
  email,
  error,
  setError,
  setVisible,
  setUserInfos,
  loading,
  setLoading,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const sendEmail = async () => {
    try {
      setLoading(true);
      const result = await dispatch(sendResetPasswordCode({ email }));
      if (result.payload?.status !== 200)
        {
          setLoading(false);
          return setError(result.payload?.message as string);
        }
      setError("");
      setVisible(2);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className={`${styles.reset_form} ${styles.dynamic_height}`}>
      <div className={styles.reset_form_header}>Reset Your Password</div>
      <div className={styles.reset_grid}>
        <div className={styles.reset_left}>
          <div className={styles.reset_form_text}>
            How do you want to receive the code to reset your password?
          </div>
          <label htmlFor="email" className="hover1">
            <input type="radio" id="email" checked readOnly />
            <div className={styles.label_col}>
              <span>Send code via email</span>
              <span>{userInfos.email}</span>
            </div>
          </label>
        </div>
        <div className={styles.reset_right}>
          <img src={userInfos.picture} alt="User profile" />
          <span>{userInfos.email}</span>
          <span>Facebook user</span>
        </div>
      </div>
      {error && (
        <div className={styles.error_text} style={{ padding: "10px" }}>
          {error}
        </div>
      )}
      <div className={styles.reset_form_btns}>
        <Link to="/login" className="btn btn-gray">
          Not You?
        </Link>
        <button
          onClick={sendEmail}
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Loading..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default SendEmail;
