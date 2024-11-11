import { FC } from "react";
import * as Yup from "yup";
import styles from "./Register.module.css";
import { FormikHelpers } from "formik";

interface MyFormValues {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  bYear: number;
  bMonth: number;
  bDay: number;
  gender: string;
}

// Validation schema for form fields
const RegisterSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("What's your First name ?")
    .min(2, "Fisrt name must be between 2 and 16 characters.")
    .max(16, "Fisrt name must be between 2 and 16 characters.")
    .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
  last_name: Yup.string()
    .required("What's your Last name ?")
    .min(2, "Last name must be between 2 and 16 characters.")
    .max(16, "Last name must be between 2 and 16 characters.")
    .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
  email: Yup.string()
    .required(
      "You'll need this when you log in and if you ever need to reset your password."
    )
    .email("Enter a valid email address."),
  password: Yup.string()
    .required(
      "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
    )
    .min(6, "Password must be atleast 6 characters.")
    .max(36, "Password can't be more than 36 characters"),
});

const Register: FC = () => {
  const initialValues: MyFormValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };
  // Form submission handler
  const handleSubmit = (
    values: MyFormValues,
    actions: FormikHelpers<MyFormValues>
  ) => {
    console.log({ values, actions });
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  };
  return (
    <div className="blur">
      <div className={styles.register}></div>
    </div>
  );
};

export default Register;
