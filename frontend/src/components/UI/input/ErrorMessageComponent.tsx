// src/components/ErrorMessageComponent.tsx

import React from "react";
import { ErrorMessage } from "formik";
import styles from "./Input.module.css";

interface ErrorMessageComponentProps {
  name: string;
  touched: boolean | undefined;
  error: string | undefined;
  isErrorButton: boolean;
  desktopView: boolean;
  view1050: boolean;
}

const ErrorMessageComponent: React.FC<ErrorMessageComponentProps> = ({
  name,
  touched,
  error,
  isErrorButton,
  desktopView,
  view1050,
}) => {
  if (!touched || !error ) return null;

  const errorClass = desktopView && view1050 && name === "password"
    ? `${styles.errorText} ${styles.errorTextDesktop} err_res_password ${styles.errorClassName}`
    : desktopView
    ? `${styles.errorText} ${styles.errorTextDesktop} ${styles.errorClassName}`
    : `${styles.errorText} ${styles.errorClassName}`;

  const arrowClass = desktopView ? styles.errorArrowLeft : isErrorButton? styles.errorArrowBottom: styles.errorArrowTop;
  const orderClass = isErrorButton ? styles.order3: styles.order2

  return (
    <div className={`${errorClass} ${orderClass}`} style={{ transform: "translateY(3px)" }}>
      <ErrorMessage name={name} />
      <div className={arrowClass}></div>
    </div>
  );
};

export default ErrorMessageComponent;
