import { FC, useEffect, useState } from "react";
import styles from "./ChatBody.module.css";
import { DefaultUser } from "../../../../types/Post";
import MessagesConversation from "./messagesConversation/MessagesConversation";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../app/store";
import { Chat } from "../../../../types/Chat";
import RecipientProfile from "./recipientProfile/RecipientProfile";
import ThreadComposer from "./threadComposer/ThreadComposer";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../../../features/functions";

type ChatBodyProps = {
    chatId:string;
    recipient:DefaultUser;
}
const ChatBody:FC<ChatBodyProps> = ({chatId,recipient}) => {
    const dispatch = useDispatch<AppDispatch>();
    const chats = useSelector((state: RootState) => state.chat.chats);
    const token = useSelector((state: RootState) => state.auth.token);
    const senderId = useSelector((state: RootState) => state.user.user?._id);
    const [chat,setChat] = useState<Chat<DefaultUser> | undefined>(
        chats.find((c) => c._id === chatId));
    useEffect(() =>{
        setChat(chats.find((c) => c._id === chatId));
      
    },[chatId, chats]);
    
    const sendMessageHandler = async (message:string) => {
        if(chat && senderId){
            
            const msg = await  dispatch(sendMessage({content:message, chatId:chat._id as string,token:token as string}));
            console.log(msg)
        }
    }
    return (
        <div className={styles.chatBody}>
            <div className={styles.chatBody_content}>
                <RecipientProfile name={`${recipient.last_name} ${recipient.first_name}`} imageUrl={recipient.picture as string}/>
                {chat && <MessagesConversation key={chat.messages.length} messages={chat.messages} />}
            </div>
            <ThreadComposer onSendMessage={sendMessageHandler}/>
    
        </div>
    )
};

export default ChatBody;