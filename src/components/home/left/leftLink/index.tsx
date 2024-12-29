import { FC } from "react";
import styles from "../LeftHome.module.css"
export  type  LeftLinkProps = {
    linkImage: string;
    text: string;
    notification?: string;
  };

const LeftLink:FC<LeftLinkProps> = ({linkImage, text,notification}) => {
    return (
       <div className={`${styles.left_link} hover2`}>
      <img src={`/left/${linkImage}.png`} alt="" />
      {notification !== undefined ? (
        <div className={styles.col}>
          <div className={styles.col_1}>{text}</div>
          <div className={styles.col_2}>{notification}</div>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </div>
    );
}
export default LeftLink