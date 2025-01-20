import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../Profile.module.css";
import { AppDispatch, RootState } from "../../../app/store";
import { FriendshipStatus } from "../../../types/types";
import useClickOutside from "../../../hooks/useClickOutside";
import {
  acceptRequest,
  addFriend,
  cancelRequest,
  deleteRequest,
  follow,
  unfollow,
  unfriend,
} from "../../../features/functions";

type FriendshipProps = {
  friendships: FriendshipStatus;
  profileId: string;
};

const Friendship: React.FC<FriendshipProps> = ({ friendships, profileId }) => {
  const [friendship, setFriendship] = useState<FriendshipStatus>(friendships);
  const [friendsMenu, setFriendsMenu] = useState(false);
  const [respondMenu, setRespondMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const respondMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setFriendsMenu(false));
  useClickOutside(respondMenuRef, () => setRespondMenu(false));

  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setFriendship(friendships);
  }, [friendships]);

  const addFriendHandler = async () => {
    setFriendship({ ...friendship, requestSent: true, following: true });
    await dispatch(addFriend({ id: profileId, token: token ?? "" }));
  };

  const cancelRequestHandler = async () => {
    setFriendship({ ...friendship, requestSent: false, following: false });
    await dispatch(cancelRequest({ id: profileId, token: token ?? "" }));
  };

  const followHandler = async () => {
    setFriendship({ ...friendship, following: true });
    await dispatch(follow({ id: profileId, token: token ?? "" }));
  };

  const unfollowHandler = async () => {
    setFriendship({ ...friendship, following: false });
    await dispatch(unfollow({ id: profileId, token: token ?? "" }));
  };

  const acceptRequestHandler = async () => {
    setFriendship({
      ...friendship,
      friends: true,
      following: true,
      requestSent: false,
      requestReceived: false,
    });
    await dispatch(acceptRequest({ id: profileId, token: token ?? "" }));
  };

  const unfriendHandler = async () => {
    setFriendship({
      ...friendship,
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    });
    await dispatch(unfriend({ id: profileId, token: token ?? "" }));
  };

  const deleteRequestHandler = async () => {
    setFriendship({
      ...friendship,
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    });
    await dispatch(deleteRequest({ id: profileId, token: token ?? "" }));
  };

  return (
    <div className={styles.friendship}>
      {friendship?.friends ? (
        <div className={styles.friends_menu_wrap}>
          <button className="btn btn-gray" onClick={() => setFriendsMenu(true)}>
            <img src="/icons/friends.png" alt="Friends" />
            <span>Friends</span>
          </button>
          {friendsMenu && (
            <div className={styles.open_cover_menu} ref={menuRef}>
              <div className={styles.open_cover_menu_item}>
                <img src="/icons/favoritesOutline.png" alt="Favorites" />
                Favorites
              </div>
              <div className={styles.open_cover_menu_item}>
                <img src="/icons/editFriends.png" alt="Edit Friend" />
                Edit Friend list
              </div>
              {friendship?.following ? (
                <div
                  className={styles.open_cover_menu_item}
                  onClick={unfollowHandler}
                >
                  <img src="/icons/unfollowOutlined.png" alt="Unfollow" />
                  Unfollow
                </div>
              ) : (
                <div
                  className={styles.open_cover_menu_item}
                  onClick={followHandler}
                >
                  <img src="/icons/unfollowOutlined.png" alt="Follow" />
                  Follow
                </div>
              )}
              <div
                className={styles.open_cover_menu_item}
                onClick={unfriendHandler}
              >
                Unfriend
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendship?.requestSent &&
        !friendship?.requestReceived && (
          <button className="btn btn-primary" onClick={addFriendHandler}>
            <img src="/icons/addFriend.png" alt="Add Friend" />
            <span>Add Friend</span>
          </button>
        )
      )}
      {friendship?.requestSent ? (
        <button className="btn btn-primary" onClick={cancelRequestHandler}>
          <img src="/icons/cancelRequest.png" alt="Cancel Request" />
          <span>Cancel Request</span>
        </button>
      ) : (
        friendship?.requestReceived && (
          <div className={styles.friends_menu_wrap}>
            <button
              className="btn btn-gray"
              onClick={() => setRespondMenu(true)}
            >
              <img src="/icons/friends.png" alt="Respond" />
              <span>Respond</span>
            </button>
            {respondMenu && (
              <div className={styles.open_cover_menu} ref={respondMenuRef}>
                <div
                  className={styles.open_cover_menu_item}
                  onClick={acceptRequestHandler}
                >
                  Confirm
                </div>
                <div
                  className={styles.open_cover_menu_item}
                  onClick={deleteRequestHandler}
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        )
      )}
      <div className={styles.flex}>
        {friendship?.following ? (
          <button className="btn btn-gray" onClick={unfollowHandler}>
            <img src="/icons/follow.png" alt="Following" />
            <span>Following</span>
          </button>
        ) : (
          <button className="btn btn-primary" onClick={followHandler}>
            <img src="/icons/follow.png" alt="Follow" />
            <span>Follow</span>
          </button>
        )}
        <button
          className={friendship?.friends ? "btn btn-primary" : "btn btn-gray"}
        >
          <img src="/icons/message.png" alt="Message" />
          <span>Message</span>
        </button>
      </div>
    </div>
  );
};

export default Friendship;
