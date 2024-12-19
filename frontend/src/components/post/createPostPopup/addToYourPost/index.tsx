import { FC } from "react";
import { Dots, Feeling, Photo } from "../../../svg";
import styles from "../CreatePostPopup.module.css";

export type AddToYourPostProps = {
    setShowPrev: (showPrev: boolean) => void;
  };


const AddToYourPost:FC<AddToYourPostProps> = ({setShowPrev}) => {
    return (
        <div className={styles.addtoyourpost}>
        <div className={styles.addto_text}>Add to your post</div>
        <div
          className={`${styles.post_header_right} hover1`}
          onClick={() => {
            setShowPrev(true);
          }}
        >
          <Photo color="#45bd62" />
        </div>
        <div className={`${styles.post_header_right} hover1`}>
          <i className="tag_icon"></i>
        </div>
        <div className={`${styles.post_header_right} hover1`}>
          <Feeling color="#f7b928" />
        </div>
        <div className={`${styles.post_header_right} hover1`}>
          <i className="maps_icon"></i>
        </div>
        <div className={`${styles.post_header_right} hover1`}>
          <i className="microphone_icon"></i>
        </div>
        <div className={`${styles.post_header_right} hover1`}>
          <Dots color="#65676b" />
        </div>
      </div>
    );
}

export default AddToYourPost;