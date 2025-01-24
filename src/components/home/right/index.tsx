import { FC } from "react";
import styles from "./RightHome.module.css";
import ContactsWrap from "../../chat/contactsWrap";

const RightHome: FC = () => {
 
  return (
    <div className={styles.right_home}>
      <div className={styles.heading}>Sponsored</div>
      <div className={styles.splitter1}></div>
      <ContactsWrap/>
    </div>
  );
};

export default RightHome;
