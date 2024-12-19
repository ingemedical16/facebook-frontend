// PostProfilePicture.tsx
import React from "react";
import styles from "../Post.module.css";

interface PostProfilePictureProps {
  userCover?: string;
  profilePicture: string;
}

const PostProfilePicture: React.FC<PostProfilePictureProps> = ({
  userCover,
  profilePicture,
}) => {
  return (
    <div className={styles.post_profile_wrap}>
      {userCover && (
        <div className={styles.post_updated_bg}>
          <img src={userCover} alt="User Cover" />
        </div>
      )}
      <img
        src={profilePicture}
        alt="Profile"
        className={styles.post_updated_picture}
      />
    </div>
  );
};

export default PostProfilePicture;
