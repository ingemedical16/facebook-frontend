import { FC } from "react";
import { useSelector } from "react-redux";
import styles from "./CreatePost.module.css"
import { Feeling, LiveVideo, Photo } from "../../svg";
import { RootState } from "../../../app/store";

export type CreatePostProps = {
    setCreatePostPopupVisible:(isVisible:boolean) => void;
    profile?: boolean;
}

const CreatePost:FC<CreatePostProps> = ({setCreatePostPopupVisible,profile = false}) =>{
    const user = useSelector((state: RootState) => state.user.user);
    return (
        <div className={styles.createPost}>
          <div className={styles.createPost_header}>
            <img src={user?.picture} alt="" />
            <div
              className={`${styles.open_post} hover2`}
              onClick={() => {
                setCreatePostPopupVisible(true);
              }}
            >
              What's on your mind, {user?.first_name}
            </div>
          </div>
          <div className={styles.create_splitter}></div>
          <div className={styles.createPost_body}>
            <div className={`${styles.createPost_icon} hover1`}>
              <LiveVideo color="#f3425f" />
              Live Video
            </div>
            <div className={`${styles.createPost_icon} hover1`}>
              <Photo color="#4bbf67" />
              Photo/Video
            </div>
            {profile ? (
              <div className={`${styles.createPost_icon} hover1`}>
                <i className="lifeEvent_icon"></i>
                Life Event
              </div>
            ) : (
              <div className={`${styles.createPost_icon} hover1`}>
                <Feeling color="#f7b928" />
                Feeling/Activity
              </div>
            )}
          </div>
        </div>
      );
};

export default CreatePost;