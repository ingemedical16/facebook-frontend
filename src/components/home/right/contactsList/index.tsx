import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import Contact from "../contact";
import styles from "../RightHome.module.css";

const ContactsList: FC = () => {
  const { friends } = useSelector((state: RootState) => state.friends);
  return (
    <div className={styles.contacts_list}>
      {friends.map((friend) => (
        <Contact
          key={friend._id}
          first_name={friend.first_name}
          last_name={friend.last_name}
          picture={friend.picture as string}
        />
      ))}
    </div>
  );
};

export default ContactsList;
