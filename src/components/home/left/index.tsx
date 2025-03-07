import { FC, useState } from "react";
import styles from "./LeftHome.module.css";
import { Link } from "react-router-dom";
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { left } from "../../../data/home";
import LeftLink from "./leftLink";
import { ArrowDown1 } from "../../svg";
import Shortcut from "./shortcut";

const LeftHome:FC = () => {
    const user = useSelector(
        (state: RootState) => state.user.user
      );
    const [visible, setVisible] = useState(false);
    return (
        <div className={`${styles.left_home} ${styles.scrollbar}`}>
        <Link to="/profile" className={`${styles.left_link} hover2`}>
          <img src={user?.picture} alt="" />
          <span>
            {user?.first_name} {user?.last_name}
          </span>
        </Link>
        {left.slice(0, 8).map((link, i) => (
          <LeftLink
            key={i}
            linkImage={link.img}
            text={link.text}
            notification={link.notification}
          />
        ))}
        {!visible && (
          <div
            className={`${styles.left_link} hover2`}
            onClick={() => {
              setVisible(true);
            }}
          >
            <div className={styles.small_circle}>
              <ArrowDown1 />
            </div>
            <span>See more</span>
          </div>
        )}
        {visible && (
          <div className={styles.more_left}>
            {left.slice(8, left.length).map((link, i) => (
              <LeftLink
                key={i}
                linkImage={link.img}
                text={link.text}
                notification={link.notification}
              />
            ))}
            <div
               className={`${styles.left_link} hover2`}
              onClick={() => {
                setVisible(false);
              }}
            >
              <div className={`${styles.small_circle} ${styles.rotate360} `}>
                <ArrowDown1 />
              </div>
              <span>Show less</span>
            </div>
          </div>
        )}
        <div className={styles.splitter}></div>
        <div className={styles.shortcut}>
          <div className={styles.heading}>Your Shortcuts</div>
          <div className={styles.edit_shortcut}>Edit</div>
        </div>
        <div className={styles.shortcut_list}>
          <Shortcut
            link="https://www.youtube.com/"
            linkImage="/images/ytb.png"
            name="My Youtube channel"
          />
  
          <Shortcut
            link="https://www.instagram.com"
            linkImage="/images/insta.png"
            name="My Instagram "
          />
        </div>
        <div className={`${styles.fb_copyright} ${visible && styles.relative_fb_copyright}`}>
          <Link to="/">Privacy </Link>
          <span>. </span>
          <Link to="/">Terms </Link>
          <span>. </span>
          <Link to="/">Advertising </Link>
          <span>. </span>
          <Link to="/">
            Ad Choices <i className="ad_choices_icon"></i>{" "}
          </Link>
          <span>. </span>
          <Link to="/"></Link>Cookies <span>. </span>
          <Link to="/">More </Link>
          <span>. </span> <br />
          Meta © 2024
        </div>
      </div>
    );
};

export default LeftHome;