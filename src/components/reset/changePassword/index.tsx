import { FC } from "react";
import * as Yup from "yup";
import styles from "../Reset.module.css";
import { Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import Input from "../../UI/input/Input";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { changePassword } from "../../../features/function";

interface MyFormValues {
  password: string;
  conf_password: string;
}
interface ChangePasswordProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  conf_password: string;
  setConf_password: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userInfos: { email: string };
}

const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required(
      "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
    )
    .min(6, "Password must be atleast 6 characters.")
    .max(36, "Password can't be more than 36 characters"),

  conf_password: Yup.string()
    .required("Confirm your password.")
    .oneOf([Yup.ref("password")], "Passwords must match."),
});
const initialValues: MyFormValues = {
  password: "",
  conf_password: "",
};
const ChangePassword: FC<ChangePasswordProps> = ({
  setError,
  loading,
  setLoading,
  userInfos,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const changePasswordHandler = async (
    values: MyFormValues,
    actions: FormikHelpers<MyFormValues>
  ) => {
    try {
      setLoading(true);
      const { conf_password, password } = values;
      if (password !== conf_password) setError("Passwords do not match");
      const result = await dispatch(
        changePassword({ email: userInfos.email, password })
      );
      if (result.payload?.status !== 200) {
        setLoading(false);
        return setError(result.payload?.message as string);
      }
      setError("");
      setLoading(false);
      navigate("/");
      actions.setSubmitting(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || "An error occurred.");
    }
  };
  return (
    <div className={styles.reset_form} style={{ height: "310px" }}>
      <div className={styles.reset_form_header}>Change Password</div>
      <div className={styles.reset_form_text}>Pick a strong password</div>
      <Formik
        initialValues={initialValues}
        validationSchema={ChangePasswordSchema}
        onSubmit={changePasswordHandler}
      >
        {(formik) => (
          <Form>
            <Input
              type="password"
              placeholder="New password"
              {...formik.getFieldProps("password")}
              containerClassName={styles.inputContainer}
              inputClassName={styles.inputClassName}
              autoComplete="current-password"
            />
            <Input
              type="password"
              placeholder="conformed password"
              {...formik.getFieldProps("conf_password")}
              containerClassName={styles.inputContainer}
              inputClassName={styles.inputClassName}
              autoComplete="current-password"
              isErrorButton={true}
            />

            <div className={styles.reset_form_btns}>
              <Link to="/login" className="btn btn-gray">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Loading..." : "Continue"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
