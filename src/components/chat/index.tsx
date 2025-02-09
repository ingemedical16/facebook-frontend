import { FC } from "react";
import styles from "./Chat.module.css";
import ChatSearch from "./chatSearch/ChatSearch";
import ChatMessager from "./chatMessager/ChatMessager";
import ChatMenu from "./chatMenu/ChatMenu";
export type ChatBox = {
  userId?: string; // id of the user the chat is with
  isUser: boolean;
};
export type ChatProps = {
  chatBox: ChatBox[];
  menu: ChatBox[];
  onContactClick: (box: ChatBox) => void;
  closeChat: (box: ChatBox) => void;
  minimizedChat: (box: ChatBox) => void;
  maximizedChat: (box: ChatBox) => void;
};
export const BoxSearch: ChatBox = { isUser: false, userId: "search" };

const Chat: FC<ChatProps> = ({
  chatBox,
  menu,
  onContactClick,
  closeChat,
  minimizedChat,
  maximizedChat,
}) => {
  return (
    <>
      <div className={styles.bottomContainer}>
        {chatBox.map((el) => {
          return el.isUser ? (
            <ChatMessager
              key={el.userId}
              userId={el.userId!}
              closeChat={() => closeChat(el)}
              minimizedChat={() => minimizedChat(el)}
            />
          ) : (
            <ChatSearch
              key={el.userId}
              onContactClick={onContactClick}
              closeChat={() => closeChat(BoxSearch)}
            />
          );
        })}
      </div>

      <ChatMenu
        menu={menu}
        openContactSearch={() => onContactClick(BoxSearch)}
        closeContactMenu={closeChat}
        maximizedChat={maximizedChat}
      />
    </>
  );
};
export default Chat;
