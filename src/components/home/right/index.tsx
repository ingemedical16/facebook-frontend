import { FC, useState } from "react";
import styles from "./RightHome.module.css";
import ContactsWrap from "../../chat/contactsWrap";
import Chat, { ChatBox } from "../../chat";

const RightHome: FC = () => {
const [chatBox,setChatBox] = useState<ChatBox[]|undefined>()
const [leftMenu,setLeftMenu] = useState<ChatBox[]>([])

const addNewChatHandler = (box:ChatBox) =>{
  if (chatBox?.some((chat) => chat.userId === box.userId) || leftMenu.some((chat) => chat.userId === box.userId)) {
    console.log("Chat already exists, ignoring...");
    return;
  }
  if(!chatBox){
    setChatBox([box]);
  }else if(chatBox.length < 2){
    setChatBox([...chatBox,box]);
  }else {
    setLeftMenu([...leftMenu,chatBox[1]]);
    setChatBox([box,chatBox[0]]);
  }
}

const closeChatHandler = (box:ChatBox) => {
  if(leftMenu.some((chat) => chat.userId === box.userId)){
    setLeftMenu(leftMenu.filter((chat) => chat.userId!== box.userId));
  }else if(chatBox?.some((chat) => chat.userId === box.userId)){
    setChatBox(chatBox.filter((chat) => chat.userId!== box.userId));
  }
} 
const minimizedChatBoxHandler = (box:ChatBox) => {
  if(chatBox?.some((chat) => chat.userId === box.userId)){
    setLeftMenu([...leftMenu,chatBox.find((chat) => chat.userId === box.userId)as ChatBox]);
    setChatBox(chatBox.filter((chat) => chat.userId!== box.userId));
  }
};
const maximizedChatBoxHandler = (box: ChatBox) => {
  if (leftMenu.some((chat) => chat.userId === box.userId)) {
    // Restore the chat from leftMenu
    const restoredChat = leftMenu.find((chat) => chat.userId === box.userId) as ChatBox;
    const updatedLeftMenu = leftMenu.filter((chat) => chat.userId !== box.userId);

    // Handle chatBox capacity (max 2 chats)
    if (!chatBox || chatBox.length < 2) {
      setChatBox(chatBox ? [...chatBox, restoredChat] : [restoredChat]);
    } else {
      setLeftMenu([chatBox[1], ...updatedLeftMenu]);
      setChatBox([restoredChat, chatBox[0]]);
    }
  }
};

 
  return (
    <>
    <div className={styles.right_home}>
      <div className={styles.heading}>Sponsored</div>
      <div className={styles.splitter1}></div>
      <ContactsWrap onContactClick={addNewChatHandler}/>
    </div>
   {chatBox && <Chat 
                  chatBox={chatBox} 
                  onContactClick={addNewChatHandler}
                  closeChat={closeChatHandler}
                  minimizedChat={minimizedChatBoxHandler}
                  maximizedChat={maximizedChatBoxHandler}
                  menu={leftMenu}
                />}
    </>
  );
};

export default RightHome;
