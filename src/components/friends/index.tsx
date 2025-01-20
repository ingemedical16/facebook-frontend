import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styles from "./Friends.module.css";
import { AppDispatch, RootState } from "../../app/store";
import { FriendsType } from "../../types/Friends";
import { getFriendsPageInfos } from "../../features/functions";
import Card from "./card";

const Friends: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const { type } = useParams<{ type?: string }>();

  const [data, setData] = useState<FriendsType>({
    requests: [],
    sentRequests: [],
    friends: [],
  });

  // useCallback to memoize the function
  const getData = useCallback(async () => {
    try {
      const res = await dispatch(
        getFriendsPageInfos({ token: token as string })
      );
      if (res.payload?.status === 200) {
        setData({
          requests: res.payload.data.requests,
          sentRequests: res.payload.data.sentRequests,
          friends: res.payload.data.friends,
        });
      } else {
        console.error("An error occurred while fetching data.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, [dispatch, token]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className={styles.friends}>
      <div className={styles.friends_left}>
        <div className={styles.friends_left_header}>
          <h3>Friends</h3>
          <div className={styles.small_circle}>
            <i className="settings_filled_icon"></i>
          </div>
        </div>
        <div className={styles.friends_left_wrap}>
          <Link
            to="/friends"
            className={`${styles.mmenu_item} hover3 ${
              type === undefined ? styles.active_friends : ""
            }`}
          >
            <div className={styles.itemIcon}>
              <div className={styles.small_circle}>
                <i className="friends_home_icon"></i>
              </div>
              <span>Home</span>
            </div>
            <div className={styles.rArrow}>
              <i className="right_icon"></i>
            </div>
          </Link>
          <Link
            to="/friends/requests"
            className={`${styles.mmenu_item} hover3 ${
              type === "requests" ? styles.active_friends : ""
            }`}
          >
            <div className={styles.itemIcon}>
              <div className={styles.small_circle}>
                <i className="friends_requests_icon"></i>
              </div>
              <span>Friend Requests</span>
            </div>
            <div className={styles.rArrow}>
              <i className="right_icon"></i>
            </div>
          </Link>
          <Link
            to="/friends/sent"
            className={`${styles.mmenu_item} hover3 ${
              type === "sent" ? styles.active_friends : ""
            }`}
          >
            <div className={styles.itemIcon}>
              <div className={styles.small_circle}>
                <i className="friends_requests_icon"></i>
              </div>
              <span>Sent Requests</span>
            </div>
            <div className={styles.rArrow}>
              <i className="right_icon"></i>
            </div>
          </Link>
          <div className={`${styles.mmenu_item} hover3`}>
            <div className={styles.itemIcon}>
              <div className={styles.small_circle}>
                <i className="friends_suggestions_icon"></i>
              </div>
              <span>Suggestions</span>
            </div>
            <div className={styles.rArrow}>
              <i className="right_icon"></i>
            </div>
          </div>
          <Link
            to="/friends/all"
            className={`${styles.mmenu_item} hover3 ${
              type === "all" ? styles.active_friends : ""
            }`}
          >
            <div className={styles.itemIcon}>
              <div className={styles.small_circle}>
                <i className="all_friends_icon"></i>
              </div>
              <span>All Friends</span>
            </div>
            <div className={styles.rArrow}>
              <i className="right_icon"></i>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.friends_right}>
        {(type === undefined || type === "requests") && (
          <div className={styles.friends_right_wrap}>
            <div className={styles.friends_left_header}>
              <h3>Friend Requests</h3>
              {type === undefined && (
                <Link to="/friends/requests" className="see_link hover3">
                  See all
                </Link>
              )}
            </div>
            <div className={styles.flex_wrap}>
              {data.requests.map((user) => (
                <Card
                  key={user._id}
                  user={user}
                  type="request"
                  getData={getData}
                />
              ))}
            </div>
          </div>
        )}
        {(type === undefined || type === "sent") && (
          <div className={styles.friends_right_wrap}>
            <div className={styles.friends_left_header}>
              <h3>Sent Requests</h3>
              {type === undefined && (
                <Link to="/friends/sent" className="see_link hover3">
                  See all
                </Link>
              )}
            </div>
            <div className={styles.flex_wrap}>
              {data.sentRequests.map((user) => (
                <Card
                  key={user._id}
                  user={user}
                  type="sent"
                  getData={getData}
                />
              ))}
            </div>
          </div>
        )}
        {(type === undefined || type === "all") && (
          <div className={styles.friends_right_wrap}>
            <div className={styles.friends_left_header}>
              <h3>Friends</h3>
              {type === undefined && (
                <Link to="/friends/all" className="see_link hover3">
                  See all
                </Link>
              )}
            </div>
            <div className={styles.flex_wrap}>
              {data.friends.map((user) => (
                <Card
                  key={user._id}
                  user={user}
                  type="friends"
                  getData={getData}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
