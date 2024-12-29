import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import styles from  "./verifyEmail.module.css"

interface ActivateFormProps {
  type: "success" | "error";
  header: string;
  text: string;
  loading: boolean;
}

const ActivateForm: React.FC<ActivateFormProps> = ({ type, header, text, loading }) => {
  return (
    <div className="blur">
      <div className={styles.popup}>
        <div
          className={`${styles.popup_header} ${
            type === "success" ? styles.success_text : styles.error_text
          }`}
        >
          {header}
        </div>
        <div className={styles.popup_message}>{text}</div>
        <PropagateLoader color="#1876f2" size={20} loading={loading} />
      </div>
    </div>
  );
};

export default ActivateForm;
