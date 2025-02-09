import { FC, useEffect, useState } from "react";
import Wrapper from "../wrapper/Wrapper";
import ChatHeader from "./chatHeader/ChatHeader";
import { createPrivateChat } from "../../../features/functions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { DefaultUser } from "../../../types/Post";
import ChatBody from "./chatBody/ChatBody";

type ChatMessagerProps = {
  userId: string;
  closeChat: () => void;
  minimizedChat: () => void;
};
const ChatMessager: FC<ChatMessagerProps> = ({
  userId,
  minimizedChat,
  closeChat,
}) => {
  const token = useSelector((state: RootState) => state.auth.token);

  const dispatch = useDispatch<AppDispatch>();
  const [lastActive, setLastActive] = useState(new Date());
  const [recipient, setRecipient] = useState<DefaultUser>({
    _id: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    picture:
      "https://res.cloudinary.com/dxos5na7j/image/upload/v1731177858/assets/images/hno2u07pzd3xh3pu5z3b.png",
  });
  const [chatId, setChatId] = useState<string>("");

  useEffect(() => {
    const createChat = async (userId: string) => {
      const chat = await dispatch(
        createPrivateChat({ recipientId: userId, token: token as string })
      );

      if (chat.payload?.status === 200) {
        setChatId(chat.payload.data._id);
        setLastActive(chat.payload.data.updatedAt);
        const updatedRecipient = chat.payload.data.members.find(
          (member: DefaultUser) => member._id === userId
        );
        setRecipient(updatedRecipient);
      }
    };
    createChat(userId);
  }, [dispatch, token, userId]);
  return (
    <Wrapper>
      <ChatHeader
        userName={`${recipient.first_name} ${recipient.last_name}`}
        profileUrl={recipient.picture as string}
        profileLink={userId}
        lastActive={lastActive}
        minimizedChat={minimizedChat}
        closeChat={closeChat}
      />
      <ChatBody chatId={chatId} recipient={recipient} />
    </Wrapper>
  );
};

export default ChatMessager;
