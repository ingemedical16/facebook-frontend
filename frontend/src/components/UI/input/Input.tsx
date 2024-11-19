// src/components/Input.tsx
import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import ErrorMessageComponent from "./ErrorMessageComponent"; // Import the new component
import styles from "./Input.module.css";
import { useIsTabletOrDesktop } from "../../../utils/functions/breakpoints";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  autocomplete?: string;
  isErrorButton?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  containerClassName = "",
  labelClassName = "",
  inputClassName = "",
  errorClassName = "",
  autocomplete,
  isErrorButton = false,
  ...props
}) => {
  // Extract the `field` and `meta` objects from Formik's `useField` hook
  const [field, meta] = useField(props.name!); // Non-null assertion because `name` is required for Formik
  const isTabletOrDesktop = useIsTabletOrDesktop()
  
  
  const orderInputClass = isErrorButton ? styles.order2: styles.order3

  return (
    <div className={`${styles.inputContainer} ${containerClassName}`}>
      {label && (
        <label className={`${styles.label} ${labelClassName}`}>{label}</label>
      )}
       {/* Display error message conditionally */}
       <ErrorMessageComponent
        name={field.name}
        touched={meta.touched}
        error={meta.error}
        isErrorButton={isErrorButton}
      />
      <input
        autoComplete={autocomplete}
        {...field} // Spread field properties
        {...props} // Spread additional input properties
        className={`${styles.input} ${orderInputClass} ${inputClassName} ${
          meta.touched && meta.error ? styles.errorInput : ""
        }`}
      />
      {meta.touched && meta.error && (
        <i
          className={`error_icon ${!isErrorButton && !isTabletOrDesktop ? styles.errorIcon : styles.errorIconDesktop}`}
         
        ></i>
      )}
    </div>
  );
};

export default Input;
