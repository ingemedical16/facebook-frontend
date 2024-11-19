// src/components/Select.tsx
import React from "react";
import { useField } from "formik";
import styles from "./Select.module.css";
import ErrorMessageComponent from "../input/ErrorMessageComponent";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  containerClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
  errorClassName?: string;
  isErrorButton?: boolean; // Add this prop to display error icon
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  containerClassName = "",
  labelClassName = "",
  selectClassName = "",
  errorClassName = "",
  isErrorButton = false, // Add this prop to display error icon
  ...props
}) => {
  const [field, meta] = useField(props.name!); // Non-null assertion as `name` is required for Formik

  return (
    <div className={`${styles.selectContainer} ${containerClassName}`}>
      {label && (
        <label className={`${styles.label} ${labelClassName}`}>
          {label}
        </label>
      )}
        <ErrorMessageComponent
        name={field.name}
        touched={meta.touched}
        error={meta.error}
        isErrorButton={isErrorButton}
        customCss={errorClassName}
      />
      <select
        {...field}
        {...props}
        className={`${styles.select} ${selectClassName} ${
          meta.touched && meta.error ? styles.errorSelect : ""
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
