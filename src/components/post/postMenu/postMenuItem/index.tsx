import { FC } from "react";
import styles from "./PostMenuItem.module.css";

type PostMenuItemProps = {
  icon?: string;
  title: string;
  subtitle?: string;
  img?: string;
};

const PostMenuItem: FC<PostMenuItemProps> = ({
  icon,
  title,
  subtitle,
  img,
}) => {
  return (
    <li className="hover1">
      {img ? <img src={img} alt={title} /> : icon && <i className={icon}></i>}
      <div className={styles.post_menu_text}>
        <span>{title}</span>
        {subtitle && <span className={styles.menu_post_col}>{subtitle}</span>}
      </div>
    </li>
  );
};

export default PostMenuItem;
