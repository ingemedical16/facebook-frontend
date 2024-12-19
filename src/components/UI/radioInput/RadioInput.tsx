import React from "react";
import { FieldHookConfig, useField } from "formik";

import styles from "./RadioInput.module.css";
import ErrorMessageComponent from "../input/ErrorMessageComponent";

export type Option = {
  label: string;
  value: string;
};

type RadioInputProps = FieldHookConfig<string> & {
  label?: string;
  options: Option[];
  isErrorButton?: boolean; // Use '?' to make the property optional
};

const RadioInput: React.FC<RadioInputProps> = ({
  label,
  options,
  isErrorButton = false,
  ...props
}) => {
  const [field, meta] = useField(props);
  const orderClass = isErrorButton ? styles.order2 : styles.order3;

  return (
    <div className={styles.container}>
      {label && <label>{label}</label>}
      <ErrorMessageComponent
        name={field.name}
        touched={meta.touched}
        error={meta.error}
        isErrorButton={isErrorButton}
      />
      <div
        role="group"
        aria-labelledby={props.name}
        className={`${styles.regGrid} ${orderClass}`}
      >
        {options.map((option) => (
          <label key={option.value} className={styles.genderLabel}>
            <input
              type="radio"
              {...field}
              value={option.value}
              checked={field.value === option.value}
              className={styles.genderInput}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioInput;
