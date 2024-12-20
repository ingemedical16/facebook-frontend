import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Header.module.css";
import { logout } from "../../../features/slices/auth/authSlice";
import { AppDispatch, RootState } from "../../../app/store";
import SettingsPrivacy from "./settingsPrivacy";
import HelpSupport from "./helpSupport";
import DisplayAccessibility from "./displayAccessibility";

const UserMenu:FC = () => {
    const { user } = useSelector(
        (state: RootState) => state.user
      );
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
  const [visible, setVisible] = useState(0);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
    return (
        <div className= {styles.mmenu}>
          {visible === 0 && (
            <div>
              <Link to="/profile" className={`${styles.mmenu_header} hover3`}>
                <img src={user?.picture} alt="" />
                <div className={styles.mmenu_col}>
                  <span>
                    {user?.first_name} {user?.last_name}
                  </span>
                  <span>See your profile</span>
                </div>
              </Link>
              <div className={styles.mmenu_splitter}></div>
              <div className={`${styles.mmenu_main} hover3`}>
                <div className={styles.small_circle}>
                  <i className="report_filled_icon"></i>
                </div>
                <div className={styles.mmenu_col}>
                  <div className={styles.mmenu_span1}>Give feedback</div>
                  <div className={styles.mmenu_span2}>Help us improve facebook</div>
                </div>
              </div>
              <div className={styles.mmenu_splitter}></div>
              <div
                className={`${styles.mmenu_item} hover3`}
                onClick={() => {
                  setVisible(1);
                }}
              >
                <div className={styles.small_circle}>
                  <i className="settings_filled_icon"></i>
                </div>
                <span>Settings & privacy</span>
                <div className={styles.rArrow}>
                  <i className="right_icon"></i>
                </div>
              </div>
              <div
                className={`${styles.mmenu_item} hover3`}
                onClick={() => {
                  setVisible(2);
                }}
              >
                <div className={styles.small_circle}>
                  <i className="help_filled_icon"></i>
                </div>
                <span>Help & support</span>
                <div className={styles.rArrow}>
                  <i className="right_icon"></i>
                </div>
              </div>
              <div
                className={`${styles.mmenu_item} hover3`}
                onClick={() => {
                  setVisible(3);
                }}
              >
                <div className={styles.small_circle}>
                  <i className="dark_filled_icon"></i>
                </div>
                <span>Display & Accessibility</span>
                <div className={styles.rArrow}>
                  <i className="right_icon"></i>
                </div>
              </div>
              <div
                className={`${styles.mmenu_item} hover3`}
                onClick={() => {
                    handleLogout();
                }}
              >
                <div className={styles.small_circle}>
                  <i className="logout_filled_icon"></i>
                </div>
                <span>Logout</span>
              </div>
            </div>
          )}
          {visible === 1 && <SettingsPrivacy setVisible={setVisible} />}
          {visible === 2 && <HelpSupport setVisible={setVisible} />}
          {visible === 3 && <DisplayAccessibility setVisible={setVisible} />}
        </div>
      );
};

export default UserMenu;