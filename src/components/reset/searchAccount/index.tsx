import { FC } from "react";
import * as Yup from "yup";
import styles from "../Reset.module.css";
import { Form, Formik, FormikHelpers } from "formik";
import Input from "../../UI/input/Input";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { searchUserByEmail } from "../../../features/functions";
import { DefaultUser } from "../../../types/Post";

interface MyFormValues {
  email: string;
}
interface SearchAccountProps {
  setError: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setVisible: React.Dispatch<React.SetStateAction<number>>;
  setUserInfos: React.Dispatch<React.SetStateAction<DefaultUser>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchAccountSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email address ir required.")
    .email("Must be a valid email address.")
    .max(50, "Email address can't be more than 50 characters."),
});
const initialValues: MyFormValues = {
  email: "",
};
const SearchAccount: FC<SearchAccountProps> = ({
  setError,
  setEmail,
  setVisible,
  setUserInfos,
  loading,
  setLoading,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const searchHandler = async (
    values: MyFormValues,
    actions: FormikHelpers<MyFormValues>
  ) => {
    try {
      setLoading(true);
      const { email } = values;

      const result = await dispatch(searchUserByEmail({ email }));
      if (result.payload?.status !== 200) {
        setLoading(false);
        return setError(result.payload?.message as string);
      }
      setEmail(email);
      setUserInfos(result.payload?.data);
      setVisible(1);
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
      <div className={styles.reset_form_header}>Find Your Account</div>
      <div className={styles.reset_form_text}>
        {" "}
        Please enter your email address or mobile number to search for your
        account.
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={SearchAccountSchema}
        onSubmit={searchHandler}
      >
        {(formik) => (
          <Form>
            <Input
              type="email"
              placeholder="Email address or phone number"
              {...formik.getFieldProps("email")}
              containerClassName={styles.inputContainer}
              inputClassName={styles.inputClassName}
              autoComplete="email"
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
                {loading ? "Loading..." : "Search"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchAccount;
