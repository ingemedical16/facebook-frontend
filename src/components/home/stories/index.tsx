import { FC } from "react";
import styles from "./Stories.module.css";
import { stories } from "../../../data/home";
import { ArrowRight, Plus } from "../../svg";
import Story from "./story";
import { useMaxStories } from "../../../hooks/useMaxStories";

const Stories:FC = () => {
    const max = useMaxStories(stories.length);
    return (
        <div className={styles.stories}>
          <div className={styles.create_story_card}>
            <img
              src="/images/default_pic.png"
              alt=""
              className={styles.create_story_img}
            />
            <div className="plus_story">
              <Plus color="#fff" />
            </div>
            <div className={styles.story_create_text}>Create Story</div>
          </div>
          {stories.slice(0, max).map((story, i) => (
            <Story {...story} key={i} />
          ))}
          <div className="white_circle">
            <ArrowRight color="#65676b" />
          </div>
        </div>
      );
};

export default Stories