import React, { useState } from "react";
import styles from "./MessageInput.module.css";
import EmojiButton from "../../../../../svg/emojiButton/EmojiButton";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onEmojiClick?: () => void;
  placeholder?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onEmojiClick,
  placeholder = "Aa",
}) => {
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onSendMessage?.(message);
        setMessage("");
      }
    }
  };

  return (
    <div className={styles.messageInputContainer}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={message}
          placeholder={placeholder}
          className={styles.inputBox}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          contentEditable={true}
          spellCheck={false}
          autoFocus
        />
        <EmojiButton onClick={onEmojiClick} className={styles.emojiButton} />
      </div>
    </div>
  );
};

export default MessageInput;
