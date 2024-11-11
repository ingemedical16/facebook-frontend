// src/components/Input.tsx
import React, { InputHTMLAttributes } from "react";
import { useField, ErrorMessage } from "formik";
import { useMediaQuery } from "react-responsive";
import ErrorMessageComponent from "./ErrorMessageComponent"; // Import the new component
import styles from "./Input.module.css";

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
  const desktopView = useMediaQuery({
    query: "(min-width: 850px)",
  });
  const view1050 = useMediaQuery({
    query: "(max-width: 1050px)",
  });
  
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
        desktopView={desktopView}
        view1050={view1050}
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
          className={`error_icon ${!isErrorButton && !desktopView ? styles.errorIcon : styles.errorIconDesktop}`}
         
        ></i>
      )}
    </div>
  );
};

export default Input;
