import React from "react";
import styles from "./Post.module.css";
import { ReactionCount } from "../../types/Reaction";

interface PostInfoProps {
  reactions: ReactionCount[];
  totalReactions: number;
  commentsLength: number;
}

const PostInfo: React.FC<PostInfoProps> = ({
  commentsLength = 0,
  reactions = [],
  totalReactions = 0,
}) => (
  <div className={styles.post_infos}>
    <div className={styles.reacts_count}>
      <div className={styles.reacts_count_imgs}>
        {reactions?.slice(0, 3).map((react, i) => (
          <img
            className={styles.reacts_count_imgs_img}
            src={`/reacts/${react.reaction}.svg`}
            alt=""
            key={i}
          />
        ))}
      </div>
      <div className={styles.reacts_count_num}>{totalReactions}</div>
    </div>
    <div className={styles.to_right}>
      <div className={styles.comments_count}>{commentsLength} comments</div>
      <div className={styles.share_count}>0 shares</div>
    </div>
  </div>
);

export default PostInfo;
