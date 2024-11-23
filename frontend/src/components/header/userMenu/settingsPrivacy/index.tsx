import { FC } from "react";
import styles from "../../Header.module.css";
export type SettingsPrivacyProps = {
    setVisible: (visible: number) => void;  
  };

const SettingsPrivacy:FC<SettingsPrivacyProps> = ({ setVisible })=>{
    return (
        <div className={styles.absolute_wrap}>
          <div className={styles.absolute_wrap_header}>
            <div
              className={`${styles.circle} hover1`}
              onClick={() => {
                setVisible(0);
              }}
            >
              <i className={styles.arrow_back_icon}></i>
            </div>
            Settings & privacy
          </div>
          <div className={`${styles.mmenu_item} hover3`}>
            <div className={styles.small_circle}>
              <i className="settings_filled_icon"></i>
            </div>
            <span>Settings</span>
          </div>
          <div className={`${styles.mmenu_item} hover3`}>
            <div className="small_circle">
              <i className="privacy_checkup_icon"></i>
            </div>
            <span>Privacy Chekup</span>
          </div>
          <div className={`${styles.mmenu_item} hover3`}>
            <div className={styles.small_circle}>
              <i className="privacy_shortcuts_icon"></i>
            </div>
            <span>Privacy Shortcuts</span>
          </div>
          <div className={`${styles.mmenu_item} hover3`}>
            <div className={styles.small_circle}>
              <i className="activity_log_icon"></i>
            </div>
            <span>Activity log</span>
          </div>
          <div className={`${styles.mmenu_item} hover3`}>
            <div className={styles.small_circle}>
              <i className="news_icon"></i>
            </div>
            <span>News Feed Preferences</span>
          </div>
          <div className={`${styles.mmenu_item} hover3`}>
            <div className={styles.small_circle}>
              <i className="language_icon"></i>
            </div>
            <span>Language</span>
          </div>
        </div>
      );
};

export default SettingsPrivacy;