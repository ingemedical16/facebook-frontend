import { FC, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import Contact, { ContactClick } from "../contact";
import styles from "../Chat.module.css";
import { useDispatch } from "react-redux";
import { getFriendsPageInfos } from "../../../features/functions";
import { ChatBox } from "..";
import { DefaultUser } from "../../../types/Post";

type ContactsListProps = {
  onContactClick: (box: ChatBox) => void;
  searchResult?: DefaultUser[];
};

const ContactsList: FC<ContactsListProps> = ({
  onContactClick,
  searchResult = [],
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const { friends } = useSelector((state: RootState) => state.friends);
  const getData = useCallback(async () => {
    try {
      const res = await dispatch(
        getFriendsPageInfos({ token: token as string })
      );
      if (res.payload?.status === 200) {
        console.log("Friends...");
      } else {
        console.error("An error occurred while fetching data.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, [dispatch, token]);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div className={styles.contacts_list}>
      {searchResult.length > 0 ? (
        <>
          <h2>Search Results</h2>
          {searchResult.map((friend) => (
            <Contact
              key={friend._id}
              first_name={friend.first_name}
              last_name={friend.last_name}
              picture={friend.picture as string}
              userId={friend._id as string}
              onContactClick={onContactClick}
            />
          ))}
        </>
      ) : (
        <>
          {friends.map((friend) => (
            <Contact
              key={friend._id}
              first_name={friend.first_name}
              last_name={friend.last_name}
              picture={friend.picture as string}
              userId={friend._id as string}
              onContactClick={onContactClick}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ContactsList;
