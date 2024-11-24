import { FC, useEffect, useRef, useState } from "react";
import styles from "../Header.module.css";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import useClickOutside from "../../../hooks/useClickOutside";
import { Return, Search } from "../../svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToSearchHistory, clearSearchResult, getSearchHistory, removeFromSearchHistory, search as searchFun } from "../../../features/search/searchSlice";
import { showToast, ToastType } from "../../../utils/toast/showToast";

export type SearchMenuProps = {
  color: string;
  setShowSearchMenu: (show: boolean) => void;
};

const SearchMenu: FC<SearchMenuProps> = ({ color, setShowSearchMenu }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();
  const {search,searchResult} = useSelector((state: RootState) => state.search);
  
  const [iconVisible, setIconVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const menu = useRef(null);
  const input = useRef<HTMLInputElement>(null);
  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });
  useEffect(() => {
   token && dispatch(getSearchHistory({token}))
  }, [dispatch, token]);
  useEffect(() => {
    input.current?.focus();
  }, []);
  const searchHandler = async () => {
    if (searchTerm === "") {
      dispatch(clearSearchResult())
    } else {
    token &&  dispatch(searchFun({searchTerm,token}))
    }
  };
  const addToSearchHistoryHandler = async (searchUser: string) => {
    token && await dispatch(addToSearchHistory({searchUser, token}))
    dispatch(clearSearchResult())
    setSearchTerm("")
    setIconVisible(true)
  
  };
  const handleRemove = async (searchUserId: string) => {
    token && await dispatch(removeFromSearchHistory({searchUserId, token}))
    
  };
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
      {searchResult.length === 0 && (
        <div className={styles.search_history_header}>
          <span>Recent searches</span>
          <a>Edit</a>
        </div>
      )}
      <div className={`${styles.search_history} ${styles.scrollbar}`}>
        {search &&
          searchResult.length === 0 &&
          search
            .map((user) => (
              <div className={`${styles.search_user_item} hover1`} key={user._id}>
                <Link
                  className={styles.flex}
                  to={`/profile/${user.username}`}
                  onClick={() => addToSearchHistoryHandler(user._id)}
                >
                  <img src={user.picture} alt="" className={styles.circle_icon}/>
                  <span>
                    {user.first_name} {user.last_name}
                  </span>
                </Link>
                <i
                  className="exit_icon"
                  onClick={() => {
                    handleRemove(user._id);
                  }}
                ></i>
              </div>
            ))}
      </div>
      <div className={`${styles.search_results} ${styles.scrollbar}`}>
        {searchResult &&
          searchResult.map((user) => (
            <Link
              to={`/profile/${user.username}`}
              className={`${styles.search_user_item} hover1`}
              onClick={() => addToSearchHistoryHandler(user._id)}
              key={user._id}
            >
              <img src={user.picture} alt="" />
              <span>
                {user.first_name} {user.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};
export default SearchMenu