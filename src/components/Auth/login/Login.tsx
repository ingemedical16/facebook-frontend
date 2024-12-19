// src/components/Login.tsx
import { FC } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import styles from "./Login.module.css";
import Input from "../../UI/input/Input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { login } from "../../../features/function"
import { showToast, ToastType } from "../../../utils/toast/showToast";

// Define form field values interface
interface MyFormValues {
  email: string;
  password: string;
}

// Validation schema for form fields
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Required"),
});
interface LoginProps {
  setVisible: (visible: boolean) => void;
}

const Login: FC<LoginProps> = ({ setVisible }) => {
  // Initial form values
  const initialValues: MyFormValues = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch<AppDispatch>();
  const { message } = useSelector((state: RootState) => state.auth);
  // Form submission handler
  const handleSubmit = async (
    values: MyFormValues,
    actions: FormikHelpers<MyFormValues>
  ) => {
    const { email, password } = values;
    const result = await dispatch(login({ email, password }));
    // Handle success or error
    if (login.fulfilled.match(result)) {
      showToast(result.payload.message, ToastType.SUCCESS);
    } else {
      if (typeof result.payload === "string") {
        showToast(result.payload, ToastType.ERROR);
      } else {
        showToast("An error occurred", ToastType.ERROR);
      }
      console.error(result.payload); // Log error message
    }
    actions.setSubmitting(false);
  };

  return (
    <div className={styles.login}>
      <div className={styles.wrapper}>
        <div className={styles.iconContainer}>
          <img src="icons/facebook.svg" alt="Facebook" />
          <span>
            Facebook helps you connect and share with the people in your life.
          </span>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.formWrapper}>
            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form>
                  <Input
                    type="text"
                    placeholder="Email or Phone Number"
                    {...formik.getFieldProps("email")}
                    containerClassName={styles.inputContainer}
                    inputClassName={styles.inputClassName}
                    autoComplete="email"
                  />

                  <Input
                    type="password"
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                    containerClassName={styles.inputContainer}
                    inputClassName={styles.inputClassName}
                    autoComplete="current-password"
                    isErrorButton={true}
                  />

                  <button
                    type="submit"
                    className={`btn btn-primary ${styles.submit}`}
                  >
                    Log In
                  </button>
                </Form>
              )}
            </Formik>
            <Link className={styles.forgotLink} to="/forgot-password">
              Forgot Password?
            </Link>
            <div className={styles.splitter}></div>
            <button
              className={`btn btn-success ${styles.signUp}`}
              onClick={() => setVisible(true)}
            >
              Create Account
            </button>
          </div>
          <Link to="/" className={styles.extraLink}>
            <b>Create a Page</b> for celebrity or business.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
