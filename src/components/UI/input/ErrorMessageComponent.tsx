// src/components/ErrorMessageComponent.tsx
import React from "react";
import { ErrorMessage } from "formik";
import styles from "./Input.module.css";
import { useIsTabletOrDesktop } from "../../../utils/functions/breakpoints";

interface ErrorMessageComponentProps {
  name: string;
  touched: boolean | undefined;
  error: string | undefined;
  isErrorButton: boolean;
  customCss?: string
}

const ErrorMessageComponent: React.FC<ErrorMessageComponentProps> = ({
  name,
  touched,
  error,
  isErrorButton,
  customCss,

}) => {
  

  const isTabletOrDesktop = useIsTabletOrDesktop()
  if (!touched || !error ) return null;

  const errorClass = isTabletOrDesktop
    ? `${styles.errorText} ${styles.errorTextDesktop} ${styles.errorClassName} ${customCss}`
    : `${styles.errorText} ${styles.errorClassName} ${customCss}`;

  const arrowClass = isTabletOrDesktop ? styles.errorArrowLeft : isErrorButton? styles.errorArrowBottom: styles.errorArrowTop;
  const orderClass = isErrorButton ? styles.order3: styles.order2

  return (
    <div className={`${errorClass} ${orderClass}`} style={{ transform: "translateY(3px)" }}>
      <ErrorMessage name={name} />
      <div className={arrowClass}></div>
    </div>
  );
};

export default ErrorMessageComponent;
