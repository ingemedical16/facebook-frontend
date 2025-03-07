import { FC } from "react";
import { Link } from "react-router-dom";
import { Dots } from "../../svg";
import styles from "../Profile.module.css"


const ProfileMenu:FC = () => {
     return (
        <div className={styles.profile_menu_wrap}>
          <div className={styles.profile_menu}>
            <Link to="/" className={styles.profile_menu_active}>
              Posts
            </Link>
            <Link to="/" className="hover1">
              About
            </Link>
            <Link to="/" className="hover1">
              Friends
            </Link>
            <Link to="/" className="hover1">
              Photos
            </Link>
            <Link to="/" className="hover1">
              Videos
            </Link>
            <Link to="/" className="hover1">
              Check-ins
            </Link>
            <Link to="/" className="hover1">
              More
            </Link>
            <div className={styles.p10_dots}>
              <Dots color="" />
            </div>
          </div>
        </div>
      );
};

export default ProfileMenu;