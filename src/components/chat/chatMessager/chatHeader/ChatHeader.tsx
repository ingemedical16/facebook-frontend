import React from "react";
import styles from "./ChatHeader.module.css";
import DropdownIcon from "../../../svg/dropdownIcon/DropdownIcon";
import ChatHeaderControls from "../chatHeaderControls/ChatHeaderControls";
import Moment from "react-moment";

interface ChatHeaderProps {
  userName: string;
  profileUrl: string;
  lastActive?: Date;
  profileLink: string;
   closeChat: () => void;
    minimizedChat: () => void;
  
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  userName,
  profileUrl,
  lastActive,
  profileLink,
  minimizedChat,
  closeChat,
}) => {
  return (
    <div className={styles.chatHeader}>
      <div
        className={styles.chatSettings}
        role="button"
        tabIndex={0}
        aria-label="Chat settings"
      >
        <div className={styles.userContainer}>
          <a
            href={profileLink}
            className={styles.profileLink}
            tabIndex={0}
            aria-label={userName}
          >
            <span className={styles.imageWrapper}>
              <div className={styles.profileImageContainer}>
                <img
                  src={profileUrl}
                  alt={userName}
                  className={styles.profileImage}
                  referrerPolicy="origin-when-cross-origin"
                />
              </div>
            </span>
          </a>
          <span className={styles.userInfo}>
            <div className={styles.userDetails}>
              <h2 className={styles.userName} dir="auto">
                <span>{userName}</span>
              </h2>
            </div>
            <div className={styles.lastActive}>
              <span>
              <Moment fromNow interval={30} >{lastActive}</Moment>
               </span>
            </div>
          </span>
        </div>
        <DropdownIcon />
      </div>
      <ChatHeaderControls minimizedChat={minimizedChat} closeChat={closeChat} />
    </div>
  );
};

export default ChatHeader;
