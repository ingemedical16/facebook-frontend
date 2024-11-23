import { FC } from "react";
import styles from "../../Header.module.css";
export type HelpSupportProps = {
  setVisible: (visible: number) => void;
};

const HelpSupport: FC<HelpSupportProps> = ({ setVisible }) => {
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
        Help & Support
      </div>
      <div className={`${styles.mmenu_item} hover3`}>
        <div className={styles.small_circle}>
          <i className="help_center_icon"></i>
        </div>
        <span>Help Center</span>
      </div>
      <div className={`${styles.mmenu_item} hover3`}>
        <div className={styles.small_circle}>
          <i className="email_icon"></i>
        </div>
        <span>Support Inbox</span>
      </div>
      <div className={`${styles.mmenu_item} hover3`}>
        <div className={styles.small_circle}>
          <i className="privacy_shortcuts_icon"></i>
        </div>
        <span>Privacy Shortcuts</span>
      </div>
      <div className={`${styles.mmenu_item} hover3`}>
        <div className={styles.small_circle}>
        <i className="info_filled_icon"></i>
        </div>
        <span>Report a Problem</span>
      </div>
    </div>
  );
};

export default HelpSupport;
