import React from "react";
import styles from "../Chat.module.css";

export type ContactClick = {
  onContactClick: (box: { userId?: string; isUser: boolean }) => void; // Function to add new chat box
}

export type ContactProps = {
  first_name: string;
  last_name: string;
  picture: string;
  userId:string;
  onContactClick: (box: { userId?: string; isUser: boolean }) => void; // Function to add new chat box
};
const Contact: React.FC<ContactProps> = ({first_name,last_name,picture,userId,onContactClick}) => {
 
  return (
    <div className={`${styles.contact} hover3`} onClick={()=>onContactClick({userId:userId,isUser:true})}>
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
