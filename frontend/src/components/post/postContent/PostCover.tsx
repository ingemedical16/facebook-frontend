// PostCover.tsx
import React from "react";
import styles from "../Post.module.css";

interface PostCoverProps {
  image: string;
}

const PostCover: React.FC<PostCoverProps> = ({ image }) => {
  return (
    <div className={styles.post_cover_wrap}>
      <img src={image} alt="Post Cover" />
    </div>
  );
};

export default PostCover;
