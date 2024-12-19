import { FC } from "react";
import styles from "../Stories.module.css";
export type StoryProps = {
  image: string;
  profile_picture: string;
  profile_name: string;
};

const Story: FC<StoryProps> = ({ image, profile_name, profile_picture }) => {
  return (
    <div className={styles.story}>
      <img src={image} alt="" className={styles.story_img} />
      <div className={styles.story_profile_pic}>
        <img src={profile_picture} alt="" />
      </div>
      <div className={styles.story_profile_name}>{profile_name}</div>
    </div>
  );
};

export default Story;
