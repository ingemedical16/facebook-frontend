import React, { useEffect, useRef } from "react";
import styles from "./MessagesConversation.module.css";
import { Message } from "../../../../../types/Chat";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";

interface MessagesConversationProps {
  messages: Message[];
}

const MessageItem: React.FC<{ message: Message; isCurrentUser: boolean }> = ({ message, isCurrentUser }) => (
  <div className={isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage}>
    <p className={styles.messageText}>{message.content}</p>
    <span className={styles.timestamp}>
      {message.timestamp && <Moment fromNow interval={30}>{message.timestamp}</Moment>}
    </span>
  </div>
);

const MessagesConversation: React.FC<MessagesConversationProps> = ({ messages }) => {
  const currentUser = useSelector((state: RootState) => state.user.user?._id);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the bottom of the container whenever messages change
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]); // Dependency array makes sure this runs every time messages change

  return (
    <div className={styles.container} ref={containerRef}>
      {messages.map((message) => (
        <MessageItem key={message._id} message={message} isCurrentUser={message.sender === currentUser} />
      ))}
    </div>
  );
};

export default MessagesConversation;
