import { FC, useEffect, useRef, useState } from "react";
import styles from "../Header.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import useClickOutside from "../../../hooks/useClickOutside";
import { Return, Search } from "../../svg";
import { Link } from "react-router-dom";

export type SearchMenuProps = {
  color: string;
  setShowSearchMenu: (show: boolean) => void;
};

const SearchMenu: FC<SearchMenuProps> = ({ color, setShowSearchMenu }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [iconVisible, setIconVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const menu = useRef(null);
  const input = useRef<HTMLInputElement>(null);
  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });
  const getHistory = async () => {};
  useEffect(() => {
    input.current?.focus();
  }, []);
  const searchHandler = async () => {};
  const addToSearchHistoryHandler = async (searchUser: string) => {};
  const handleRemove = async (searchUser: string) => {};
  return (
    <div
      className={`${styles.headerLeft} ${styles.search_area} ${styles.scrollbar}`}
      ref={menu}
    >
      <div className={styles.search_wrap}>
        <div className={styles.headerLogo}>
          <div
            className={`${styles.circle} hover1`}
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            <Return color={color} />
          </div>
        </div>
        <div
          className={styles.search}
          onClick={() => {
            input.current?.focus();
          }}
        >
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type="text"
            placeholder="Search Facebook"
            className={styles.searchInput}
            ref={input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={searchHandler}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
          />
        </div>
      </div>
      {results.length === 0 && (
        <div className={styles.search_history_header}>
          <span>Recent searches</span>
          <a>Edit</a>
        </div>
      )}
      <div className={`${styles.search_history} ${styles.scrollbar}`}>
        {/* {searchHistory &&
          results.length === 0 &&
          searchHistory
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((user) => (
              <div className="search_user_item hover1" key={user._id}>
                <Link
                  className="flex"
                  to={`/profile/${user.user.username}`}
                  onClick={() => addToSearchHistoryHandler(user.user._id)}
                >
                  <img src={user.user.picture} alt="" />
                  <span>
                    {user.user.first_name} {user.user.last_name}
                  </span>
                </Link>
                <i
                  className="exit_icon"
                  onClick={() => {
                    handleRemove(user?.user._id);
                  }}
                ></i>
              </div>
            ))} */}
      </div>
      <div className={`${styles.search_results} ${styles.scrollbar}`}>
        {/* {results &&
          results.map((user) => (
            <Link
              to={`/profile/${user.username}`}
              className="search_user_item hover1"
              onClick={() => addToSearchHistoryHandler(user._id)}
              key={user._id}
            >
              <img src={user.picture} alt="" />
              <span>
                {user.first_name} {user.last_name}
              </span>
            </Link>
          ))} */}
      </div>
    </div>
  );
};
export default SearchMenu