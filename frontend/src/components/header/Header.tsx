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
  ArrowDown1,
  Search,
} from "../svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import useClickOutside from "../../hooks/useClickOutside";
import SearchMenu from "./searchMenu/SearchMenu";
import AllMenu from "./allMenu/AllMenu";

type HeaderProps = {
  page?: string;
  getAllPosts?: () => void;
};

const color = "#65676b";
const Header: FC<HeaderProps> = ({ page }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const allMenu = useRef(null);
  const userMenu = useRef(null);
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
          className={styles.search}
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className={styles.searchInput}
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu
          color={color}
          setShowSearchMenu={setShowSearchMenu}
        />
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
        <Link
          to="/profile"
          className={`${styles.profile_link} hover1  ${
            page === "profile" ? styles.activeLink : ""
          }`}
        >
          <img src={user?.picture} alt="" />
          <span>{user?.first_name}</span>
        </Link>
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
        <div className={`${styles.circle_icon} hover1`}>m</div>
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
            <div style={{ transform: "translateY(2px)" }}>
              <ArrowDown color={color} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
