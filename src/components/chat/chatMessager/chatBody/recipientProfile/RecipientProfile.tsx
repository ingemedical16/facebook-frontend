import React from "react";
import styles from "./RecipientProfile.module.css";

type ProfileProps = {
  name: string;
  imageUrl: string;
};

const RecipientProfile: React.FC<ProfileProps> = ({ name, imageUrl }) => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileWrapper}>
        <div className={styles.profileImageWrapper}>
          <img
            alt={name}
            className={styles.profileImage}
            referrerPolicy="origin-when-cross-origin"
            src={imageUrl}
          />
        </div>
        <div className={styles.profileNameWrapper}>
          <span className={styles.profileName} dir="auto">
            {name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipientProfile;
