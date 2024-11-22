import { FC } from "react";
import styles from "../../Header.module.css";

export type AllMenuItemProps = {
  name: string;
  description: string;
  icon: string;
};
const AllMenuItem: FC<AllMenuItemProps> = ({ name, description, icon }) => {
  return (
    <div className={`${styles.all_menu_item} hover1`}>
      <img src={`left/${icon}.png`} alt="" />
      <div className={styles.all_menu_col}>
        <span>{name}</span>
        <span>{description}</span>
      </div>
    </div>
  );
};

export default AllMenuItem;
