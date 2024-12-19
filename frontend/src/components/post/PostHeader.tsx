import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Public, Dots } from "../svg";
import { Post as PostType } from "../../types/Post";
import styles from "./Post.module.css";

interface PostHeaderProps {
  post: PostType;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostHeader: React.FC<PostHeaderProps> = ({ post, setShowMenu }) => (
  <div className={styles.post_header}>
    <Link to={`/profile/${post.user?.username}`} className={styles.post_header_left}>
      <img src={post.user?.picture || ""} alt="" />
      <div className={styles.header_col}>
        <div className={styles.post_profile_name}>
          {post.user?.first_name} {post.user?.last_name}
        </div>
        <div className={styles.post_profile_privacy_date}>
          <Moment fromNow interval={30} >{post.createdAt}</Moment> . 
          <Public color="#828387" />
        </div>
      </div>
    </Link>
    <div
      className={`${styles.post_header_right} hover1`}
      onClick={() => setShowMenu((prev) => !prev)}
    >
      <Dots color="#828387" />
    </div>
  </div>
);

export default PostHeader;
