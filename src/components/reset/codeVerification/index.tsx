import { FC } from "react";
import * as Yup from "yup";
import styles from "../Reset.module.css";
import { Form, Formik, FormikHelpers } from "formik";
import Input from "../../UI/input/Input";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import {  validateResetCode } from "../../../features/function";

interface MyFormValues {
  code: string;
}
interface CodeVerificationProps {
  email: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setVisible: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userInfos: { email: string };
}

const CodeVerificationSchema = Yup.object().shape({
  code: Yup.string()
    .required("Code is required")
    .min(5, "Code must be 5 characters.")
    .max(5, "Code must be 5 characters."),
});
const initialValues: MyFormValues = {
  code: "",
};
const CodeVerification: FC<CodeVerificationProps> = ({
  setError,
  setVisible,
  loading,
  setLoading,
  userInfos,
  email
}) => {

  const dispatch = useDispatch<AppDispatch>();
  const verifyCodeHandler = async (
    values: MyFormValues,
    actions: FormikHelpers<MyFormValues>
  ) => {
    try {
      setLoading(true);
      const { code } = values;
     
      if (code.length !== 5) setError("Code must be 5 characters.");
      const result = await dispatch(
        validateResetCode({ email: userInfos.email, code })
      );
      if (result.payload?.status !== 200)
        {
          console.error(result.payload?.message)
          console.log(userInfos)
          setLoading(false);
          return setError(result.payload?.message as string);
        }
      setVisible(3);
      setError("");
      setLoading(false);
      actions.setSubmitting(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || "An error occurred.");
    }
  };
  return (
    <div className={styles.reset_form} style={{ height: "310px" }}>
      <div className={styles.reset_form_header}>Code verification</div>
      <div className={styles.reset_form_text}> Please enter code that been sent to your email.</div>
      <Formik
        initialValues={initialValues}
        validationSchema={CodeVerificationSchema}
        onSubmit={verifyCodeHandler}
      >
        {(formik) => (
          <Form>
            <Input
              type="test"
              placeholder="code"
              {...formik.getFieldProps("code")}
              containerClassName={styles.inputContainer}
              inputClassName={styles.inputClassName}
              autoComplete="current-password"
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

export default CodeVerification;
