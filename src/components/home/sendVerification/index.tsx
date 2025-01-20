import { FC } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styles from "./SendVerification.module.css";
import { AppDispatch, RootState } from "../../../app/store";
import { sendVerification } from "../../../features/functions";

const SendVerification: FC = () => {
  const { token, error, message } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const sendVerificationLink = async () => {
    if (token) {
      const result = await dispatch(sendVerification({ token }));
      if (sendVerification.fulfilled.match(result)) {
        // Show success message
      } else {
        // Show error message
      }
    }
  };
  return (
    <div className={styles.send_verification}>
      <span>
        Your account is not verified,verify your account before it gets deleted
        after a month from creating.
      </span>

      <p
        className={styles.sendVerificationButton}
        onClick={() => {
          sendVerificationLink();
        }}
      >
        click here to resend verification link
      </p>
      {message && <div className={styles.success_text}>{message}</div>}
      {error && <div className={styles.error_text}>{error}</div>}
    </div>
  );
};

export default SendVerification;
