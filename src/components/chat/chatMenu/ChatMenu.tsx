import { FC } from "react";
import NewMessageButton from "./newMessageButton/NewMessageButton";
import styles from "./ChatMenu.module.css";
import { ChatBox } from "..";
import ChatMenuItem from "./chatMenuItem/ChatMenuItem";

type ChatMenuProps = {
  menu: ChatBox[];
  openContactSearch: () => void;
  closeContactMenu: (box: ChatBox) => void;
  maximizedChat: (box: ChatBox) => void;
};

const ChatMenu: FC<ChatMenuProps> = ({
  menu,
  openContactSearch,
  closeContactMenu,
  maximizedChat,
}) => {
  return (
    <div className={styles.bottomLeftContainer}>
     
      {menu.map((box) =>
        box.isUser ? (
          <ChatMenuItem
            userId={box.userId as string}
            key={box.userId}
            closeChat={() => closeContactMenu(box)}
            maximizedChat={() => maximizedChat(box)}
          />
        ) : null
      )}
       <NewMessageButton onClick={openContactSearch} />
    </div>
  );
};

export default ChatMenu;
