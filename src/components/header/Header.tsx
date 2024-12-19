import { FC, useRef, useState } from "react";
import styles from "./Header.module.css";
import {
  HomeActive,
  Logo,
  Home,
  FriendsActive,
  Friends,
  Watch,
  Market,
  Gaming,
  Menu,
  Notifications,
  ArrowDown,
  Search,
  Messenger,
} from "../svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import useClickOutside from "../../hooks/useClickOutside";
import SearchMenu from "./searchMenu/SearchMenu";
import AllMenu from "./allMenu/AllMenu";
import { useDesktop } from "../../utils/functions/breakpoints";
import UserMenu from "./userMenu";

type HeaderProps = {
  page?: string;
  getAllPosts?: () => void;
};

const color = "#65676b";
const Header: FC<HeaderProps> = ({ page }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const allMenu = useRef<HTMLDivElement>(null);
  const userMenu = useRef<HTMLDivElement>(null);
  const isDesktop = useDesktop();
  useClickOutside(allMenu, () => {
    setShowAllMenu(false);
  });
  useClickOutside(userMenu, () => {
    setShowUserMenu(false);
  });

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Link to="/" className={styles.headerLogo}>
          <div className={styles.circle}>
            <Logo />
          </div>
        </Link>
        <div
          className={isDesktop ? styles.search : styles.circle_icon}
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          {isDesktop && (
            <input
              type="text"
              placeholder="Search Facebook"
              className={styles.searchInput}
            />
          )}
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}
      <div className={styles.headerCenter}>
        <Link
          to="/"
          className={`${styles.middle_icon} ${
            page === "home" ? styles.active : "hover1"
          }`}
          onClick={() => {}}
        >
          {page === "home" ? <HomeActive /> : <Home color={color} />}
        </Link>
        <Link
          to="/friends"
          className={`${styles.middle_icon} ${
            page === "friends" ? styles.active : "hover1"
          }`}
        >
          {page === "friends" ? <FriendsActive /> : <Friends color={color} />}
        </Link>
        <Link to="/" className={`${styles.middle_icon} hover1`}>
          <Watch color={color} />
          <div className={styles.middle_notification}>9+</div>
        </Link>
        <Link to="/" className={`${styles.middle_icon} hover1`}>
          <Market color={color} />
        </Link>
        <Link to="/" className={`${styles.middle_icon} hover1`}>
          <Gaming color={color} />
        </Link>
      </div>
      <div className={styles.headerRight}>
        <div
          className={`${styles.circle_icon} hover1 ${
            showAllMenu && styles.active_header
          }`}
          ref={allMenu}
        >
          <div
            onClick={() => {
              setShowAllMenu((prev) => !prev);
            }}
          >
            <div style={{ transform: "translateY(2px)" }}>
              <Menu />
            </div>
          </div>
          {showAllMenu && <AllMenu />}
        </div>
        <div className={`${styles.circle_icon} hover1`}>
          <Messenger />
        </div>
        <div className={`${styles.circle_icon} hover1`}>
          <Notifications />
          <div className={styles.right_notification}>5</div>
        </div>
        <div
          className={`${styles.circle_icon} hover1 ${
            showUserMenu && styles.active_header
          }`}
          ref={userMenu}
        >
          <div
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}
          >
            <img src={user?.picture} alt="" className={styles.profile_Image} />
            <div style={{ transform: "translate(20px,-6px)" }}>
              <ArrowDown color={color} />
            </div>
          </div>
          {showUserMenu && <UserMenu />}
        </div>
      </div>
    </header>
  );
};

export default Header;
