import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import styles from "../RightHome.module.css"


const Contact: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const color = "#65676b";
  return (
    <div className={`${styles.contact} hover3`}>
      <div className={styles.contact_img}>
        <img src={user?.picture} alt={`${user?.first_name} ${user?.last_name}`} />
      </div>
      <span>
        {user?.first_name} {user?.last_name}
      </span>
    </div>
  );
};

export default Contact;
