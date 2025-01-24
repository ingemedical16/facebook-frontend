import React from "react";
import styles from "../Chat.module.css";

export type ContactProps = {
  first_name: string;
  last_name: string;
  picture: string;
};
const Contact: React.FC<ContactProps> = ({first_name,last_name,picture}) => {
 
  return (
    <div className={`${styles.contact} hover3`}>
      <div className={styles.contact_img}>
        <img
          src={picture}
          alt={`${first_name} ${last_name}`}
        />
      </div>
      <span>
        {first_name} {last_name}
      </span>
    </div>
  );
};

export default Contact;
