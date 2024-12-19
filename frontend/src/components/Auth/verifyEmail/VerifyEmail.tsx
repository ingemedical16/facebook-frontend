import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { verifyEmail } from "../../../features/function"; // Adjust the path to your authSlice
import styles from "./verifyEmail.module.css";
import { useDispatch } from "react-redux";
import { useDesktop, useMobile } from "../../../utils/functions/breakpoints";
import { showToast, ToastType } from "../../../utils/toast/showToast";


const VerifyEmail: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { verifyToken } = useParams<{ verifyToken: string }>(); // Get token from URL params
    const { loading, error, message,token } = useSelector(
        (state: RootState) => state.auth
      );
      const isMobile = useMobile();
      const isDesktop = useDesktop();
      
      //Invalid Authentication
    useEffect(() => {

        if (!(verifyToken && token)) {
            showToast("Invalid verification link.", ToastType.ERROR);
            navigate("/login");
            return;
          }
        if (!token) {
            
          }
          const checkMail = async ()=>{
            const result = await dispatch(verifyEmail({ token, verifyToken }))
            if (verifyEmail.fulfilled.match(result)) {

             showToast(result.payload.message, ToastType.SUCCESS);
            }else {
                if (typeof result.payload === "string") {
                  showToast(result.payload, ToastType.ERROR);
                } else {//+
                  showToast("An error occurred", ToastType.ERROR);
                }//+
                console.error(result.payload); // Log error message
              }
          }
          checkMail()
      
          
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
        }, [dispatch, navigate, token,verifyToken]);
      
        return (
          <div className={styles.container}>
            <div className={`${styles.content} ${isMobile ? styles.mobile : isDesktop ? styles.desktop : ""}`}>
              {loading && (
                <p className={styles.loadingText}>Verifying your email, please wait...</p>
              ) }
              {error && <p className={styles.errorText}>{error}</p> }
              {message &&<p className={styles.message}>{message}</p> }
            </div>
          </div>
        );
      };
      
      export default VerifyEmail;