import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { verifyEmail } from "../../../features/functions"; // Adjust the path to your authSlice
import styles from "./verifyEmail.module.css";
import { useDispatch } from "react-redux";
import { showToast, ToastType } from "../../../utils/toast/showToast";
import ActivateForm from "./ActivateForm";
import Header from "../../header/Header";
import LeftHome from "../../home/left";
import Stories from "../../home/stories";
import CreatePost from "../../post/createPost";
import RightHome from "../../home/right";

const VerifyEmail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { verifyToken } = useParams<{ verifyToken: string }>(); // Get token from URL params
  const { loading, error, token } = useSelector(
    (state: RootState) => state.auth
  );
  const [success, setSuccess] = useState<string>();

  //Invalid Authentication
  useEffect(() => {
    if (!(verifyToken && token)) {
      showToast("Invalid verification link.", ToastType.ERROR);
      navigate("/login");
      return;
    }
    if (!token) {
    }
    const checkMail = async () => {
      const result = await dispatch(verifyEmail({ token, verifyToken }));
      if (verifyEmail.fulfilled.match(result)) {
        setSuccess(result.payload.message);
        showToast(result.payload.message, ToastType.SUCCESS);
      } else {
        if (typeof result.payload === "string") {
          showToast(result.payload, ToastType.ERROR);
        } else {
          //+
          showToast("An error occurred", ToastType.ERROR);
        } //+
        console.error(result.payload); // Log error message
      }
    };
    checkMail();

    // .unwrap()
    // .then((data) => {
    //   showToast("Your account has been successfully verified!", ToastType.SUCCESS);
    //   //navigate("/login");
    //   ("data",data)
    // })
    // .catch((err) => {
    //   showToast(err, ToastType.ERROR);
    //   //navigate("/login");
    // });
  }, [dispatch, navigate, token, verifyToken]);

  return (
    <div className={styles.home}>
      {success && (
        <ActivateForm
          type="success"
          header="Account verification succeded."
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          header="Account verification failed."
          text={error}
          loading={loading}
        />
      )}
      <Header />
      <LeftHome />
      <div className={styles.home_middle}>
        <Stories />
        <CreatePost />
      </div>
      <RightHome />
    </div>
  );
};

export default VerifyEmail;
