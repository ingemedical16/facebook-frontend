import React from "react";
import { Post as PostType } from "../../../types/Post";
import styles from "../Post.module.css";

interface PostMediaProps {
  post: PostType;
}

const PostMedia: React.FC<PostMediaProps> = ({ post }) => {
  if (post.background) {
    return (
      <div
        className={styles.post_bg}
        style={{ backgroundImage: `url(${post.background})` }}
      >
        <div className={styles.post_bg_text}>{post.text}</div>
      </div>
    );
  }

  if (post.type === "profilePicture") {
    return (
      <div className={styles.post_profile_wrap}>
        <div className={styles.post_updated_bg}>
          <img src={post.user?.cover || ""} alt="" />
        </div>
        <img
          src={post.images?.[0] || ""}
          alt=""
          className={styles.post_updated_picture}
        />
      </div>
    );
  }

  if (post.type === "coverPicture") {
    return (
      <div className={styles.post_cover_wrap}>
        <img src={post.images?.[0] || ""} alt="" />
      </div>
    );
  }

  return (
    <>
      <div className={styles.post_text}>{post.text}</div>
      {post.images && post.images.length > 0 && (
        <div
          className={
            styles[`grid_${Math.min(post.images?.length?? 0, 5)}`] || styles.grid_5
          }
        >
          {post.images?.slice(0, 5).map((image, i) => (
            <img src={`${image}`} key={i} alt="" className={styles[`img-${i}`]} />
          ))}
          {post.images && post.images.length > 5 && (
            <div className={styles.more_pics_shadow}>
              +{post.images.length - 5}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PostMedia;
