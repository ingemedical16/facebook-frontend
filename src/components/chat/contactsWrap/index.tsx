import { FC } from "react";
import styles from "../Chat.module.css"; // Adjust import based on file structure
import { Dots, NewRoom, Search } from "../../svg";
import ContactsList from "../contactsList";
import { ContactClick } from "../contact";
import { BoxSearch } from "..";



const ContactsWrap: FC<ContactClick> = ({onContactClick}) => {
    const color = "#65676b";
  return (
    <div className={styles.contacts_wrap}>
      <div className={styles.contacts_header}>
        <div className={styles.contacts_header_left}>Contacts</div>
        <div className={styles.contacts_header_right}>
          <div className={`${styles.contact_circle} hover1`}>
            <NewRoom color={color} />
          </div>
          <div className={`${styles.contact_circle} hover1`} onClick={()=>onContactClick(BoxSearch)}>
            <Search color={color} />
          </div>
          <div className={`${styles.contact_circle} hover1`}>
            <Dots color={color} />
          </div>
        </div>
      </div>
      <ContactsList onContactClick={onContactClick}/>
    </div>
  );
};

export default ContactsWrap;
