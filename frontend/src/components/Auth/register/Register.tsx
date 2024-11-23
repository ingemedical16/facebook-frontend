import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import DotLoader from "react-spinners/DotLoader";
import { AppDispatch, RootState } from "../../../app/store";
import { register } from "../../../features/auth/authSlice";
import * as Yup from "yup";
import { Formik, Form, FormikHelpers } from "formik";
import styles from "./Register.module.css";
import Input from "../../UI/input/Input";
import DateOfBirthSelect from "../../dateOfBirthSelect/DateOfBirthSelect";
import RadioInput, { Option } from "../../UI/radioInput/RadioInput";
import { storeTokenAndUser } from "../../../utils/token";
import { showToast, ToastType } from "../../../utils/toast/showToast";
import { User,Gender } from "../../../types/User";

interface MyFormValues {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  birth_year: number;
  birth_year_month: number;
  birth_year_day: number;
  gender: Gender;
}

interface RegisterProps {
  setVisible: (visible: boolean) => void;
}

// Validation schema for form fields
const RegisterSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("What's your First name?")
    .min(2, "First name must be between 2 and 16 characters.")
    .max(16, "First name must be between 2 and 16 characters.")
    .matches(
      /^[a-zA-Z]+(\s[a-zA-Z]+)*$/,
      "Numbers, special characters, or extra spaces are not allowed."
    ),
  last_name: Yup.string()
    .required("What's your Last name?")
    .min(2, "Last name must be between 2 and 16 characters.")
    .max(16, "Last name must be between 2 and 16 characters.")
    .matches(
      /^[a-zA-Z]+(\s[a-zA-Z]+)*$/,
      "Numbers, special characters, or extra spaces are not allowed."
    ),
  email: Yup.string()
    .required(
      "You'll need this when you log in and if you ever need to reset your password."
    )
    .email("Enter a valid email address."),
  password: Yup.string()
    .required(
      "Enter a combination of at least six numbers, letters, and punctuation marks (such as ! and &)."
    )
    .min(6, "Password must be at least 6 characters.")
    .max(36, "Password can't be more than 36 characters."),
  gender: Yup.string().required("Select your gender."),
  birth_year: Yup.number()
    .required("Select your birth year.")
    .min(1900, "You must be younger than this year.")
    .max(new Date().getFullYear() - 5, "You must be older than 5 years."),
  birth_year_month: Yup.number()
    .required("Select your birth month.")
    .min(1, "Select your birth month.")
    .max(12, "Select your birth month."),
  birth_year_day: Yup.number()
    .required("Select your birth day.")
    .min(1, "Select your birth day.")
    .max(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ).getDate(),
      "Select your birth day."
    ),
});

const Register: FC<RegisterProps> = ({ setVisible }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, message } = useSelector(
    (state: RootState) => state.auth
  );

  const initialValues: MyFormValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    birth_year: new Date().getFullYear(),
    birth_year_month: new Date().getMonth() + 1,
    birth_year_day: new Date().getDate(),
    gender: Gender.Other,
  };

  const genderOptions: Option[] = [
    { value: Gender.Male, label: "Male" },
    { value: Gender.Female, label: "Female" },
    { value: Gender.Other, label: "Other" },
  ];

  const handleSubmit = async (
    values: MyFormValues,
    actions: FormikHelpers<MyFormValues>
  ) => {
    const {
      first_name,
      last_name,
      email,
      password,
      gender,
      birth_year,
      birth_year_day,
      birth_year_month,
    } = values;

    // Dispatch register action
    const result = await dispatch(
      register({
        first_name,
        last_name,
        email,
        password,
        gender,
        birth_year,
        birth_year_day,
        birth_year_month,
      })
    );
    // Handle success or error
    if (register.fulfilled.match(result)) {
      showToast(result.payload.message, ToastType.SUCCESS);
      setVisible(false); // Hide the registration modal on success
    } else {
      if (typeof result.payload === "string") {
        showToast(result.payload, ToastType.ERROR);
      } else {
        //+
        showToast("An error occurred", ToastType.ERROR);
      } //+
      console.error(result.payload); // Log error message
    }

    actions.setSubmitting(false);
  };

  return (
    <div className="blur">
      <div className={styles.register}>
        <div className={styles.header}>
          <i className="exit_icon" onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className={styles.registerForm}>
              <div className={styles.reg_line}>
                <Input
                  type="text"
                  placeholder="First name"
                  {...formik.getFieldProps("first_name")}
                  containerClassName={styles.inputContainer}
                  inputClassName={styles.inputClassName}
                />
                <Input
                  type="text"
                  placeholder="Last name"
                  {...formik.getFieldProps("last_name")}
                  containerClassName={styles.inputContainer}
                  inputClassName={styles.inputClassName}
                />
              </div>
              <div className={styles.reg_line}>
                <Input
                  type="text"
                  placeholder="Email or Phone Number"
                  {...formik.getFieldProps("email")}
                  containerClassName={styles.inputContainer}
                  inputClassName={styles.inputClassName}
                />
              </div>
              <div className={styles.reg_line}>
                <Input
                  type="password"
                  placeholder="Password"
                  {...formik.getFieldProps("password")}
                  containerClassName={styles.inputContainer}
                  inputClassName={styles.inputClassName}
                />
              </div>
              <div className={styles.reg_col}>
                <div className={styles.reg_line_header}>
                  Date of birth <i className="info_icon"></i>
                </div>
                <DateOfBirthSelect formik={formik} />
              </div>
              <div className={styles.reg_col}>
                <div className={styles.reg_line_header}>
                  Gender <i className="info_icon"></i>
                </div>
                <RadioInput
                  isErrorButton={true}
                  options={genderOptions}
                  {...formik.getFieldProps("gender")}
                />
              </div>
              {error && <div className={styles.error}>{error}</div>}
              {message && <div className={styles.success}>{message}</div>}
              <div className={styles.regInfo}>
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy &nbsp;</span> and{" "}
                <span>Cookie Policy.</span> You may receive SMS notifications
                from us and can opt out at any time.
              </div>
              <div className={styles.btnWrapper}>
                <button
                  type="submit"
                  className={`btn btn-primary ${styles.submit}`}
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </div>
              <DotLoader color="#1876f2" loading={loading} size={30} />
              {error && <div className={styles.errorText}>{error}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
