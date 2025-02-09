import React from "react";
import styles from "./ChatButton.module.css"; // Import CSS module

interface ChatButtonProps {
  name: string;
  profileImage: string;
  onOpenChat: () => void;
  onCloseChat: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ name, profileImage, onOpenChat, onCloseChat }) => {
  return (
    <div className={styles.container}>
      {/* Open Chat Button */}
      <div
        aria-label={`Open chat with ${name}`}
        className={styles.openChatButton}
        role="button"
        tabIndex={0}
        onClick={onOpenChat}
      >
        <div className={styles.profileWrapper}>
          <img src={profileImage} alt={name} className={styles.profileImage} />
          <div aria-hidden="true" className={styles.statusIndicator}></div>
        </div>
      </div>

      {/* Close Chat Button */}
      <div aria-label="Close chat" className={styles.closeChatButton} role="button" tabIndex={0} onClick={onCloseChat}>
        <i className={styles.closeIcon}></i>
        <div className={styles.overlay} role="none"></div>
      </div>
    </div>
  );
};

export default ChatButton;
