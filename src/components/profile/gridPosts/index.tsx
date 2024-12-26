import React from "react";
import styles from "../Profile.module.css";

const GridPosts: React.FC = () => {
  return (
    <div className={styles.createPost}>
      <div
        className={styles.createPost_header}
        style={{ justifyContent: "space-between" }}
      >
        <div className={styles.left_header_grid}>Posts</div>
        <div className={styles.flex}>
          <div className="btn btn-gray">
            <i className="equalize_icon"></i>
          </div>
          <div className={`btn btn-gray`}>
            <i className="manage_icon"></i>
            Manage Posts
          </div>
        </div>
      </div>
      <div className={styles.create_splitter}></div>
      <div className={styles.createPost_body}>
        <div className={`${styles.view_type} ${styles.active}`}>
          <i className="list_icon filter_blue"></i>
          List view
        </div>
        <div className={styles.view_type}>
          <i className="grid_icon"></i>
          Grid view
        </div>
      </div>
    </div>
  );
};

export default GridPosts;
