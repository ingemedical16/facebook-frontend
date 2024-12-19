// PostBackground.tsx
import React from "react";
import styles from "../Post.module.css";

interface PostBackgroundProps {
  background: string;
  text: string;
}

const PostBackground: React.FC<PostBackgroundProps> = ({ background, text }) => {
  return (
    <div
      className={styles.post_bg}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className={styles.post_bg_text}>{text}</div>
    </div>
  );
};

export default PostBackground;
