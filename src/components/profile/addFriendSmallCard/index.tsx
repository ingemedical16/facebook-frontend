import React from "react";
import styles from "../Profile.module.css"

interface AddFriendSmallCardProps {
  item: {
    profile_picture: string;
    profile_name: string;
  };
}

const AddFriendSmallCard: React.FC<AddFriendSmallCardProps> = ({ item }) => {
  const truncateName = (name: string, length: number): string =>
    name.length > length ? `${name.substring(0, length)}...` : name;

  return (
    <div className={ styles.addfriendCard}>
      <div className={ styles.addfriend_imgsmall}>
        <img src={item.profile_picture} alt={`${item.profile_name}'s profile`} />
        <div className={ styles.addfriend_infos}>
          <div className={ styles.addfriend_name}>
            {truncateName(item.profile_name, 11)}
          </div>
          <div className={ `btn btn-primary ${styles.light_blue_btn}`}>
            <img src="icons/addFriend.png" alt="Add friend icon" className={ styles.filter_blue} />
            Add Friend
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFriendSmallCard;
