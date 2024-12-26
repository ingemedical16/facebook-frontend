import React from "react";
import { Link } from "react-router-dom";
import styles from "../Profile.module.css";
import { DefaultUser } from "../../../types/Post";


type FriendsProps = {
  friends?: DefaultUser[];
};

const Friends: React.FC<FriendsProps> = ({ friends }) => {
  const getFriendsCountText = () => {
    if (!friends || friends.length === 0) return "";
    return friends.length === 1 ? "1 Friend" : `${friends.length} Friends`;
  };

  return (
    <div className={styles.profile_card}>
      <div className={styles.profile_card_header}>
        Friends
        <div className={styles.profile_header_link}>See all friends</div>
      </div>
      {friends && (
        <div className={styles.profile_card_count}>{getFriendsCountText()}</div>
      )}
      <div className={styles.profile_card_grid}>
        {friends &&
          friends.slice(0, 9).map((friend, index) => (
            <Link
              to={`/profile/${friend.username}`}
              className={styles.profile_photo_card}
              key={index}
            >
              <img src={friend.picture} alt={`${friend.first_name} ${friend.last_name}`} />
              <span>
                {friend.first_name} {friend.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Friends;
