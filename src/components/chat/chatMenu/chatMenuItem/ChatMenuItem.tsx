import { FC, useEffect, useState } from "react";
import ChatButton from "./chatButton/ChatButton";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../app/store";
import { useDispatch } from "react-redux";
import { createPrivateChat } from "../../../../features/functions";
import { DefaultUser } from "../../../../types/Post";

type ChatMenuItemProps = {
  userId: string;
  closeChat: () => void;
  maximizedChat: () => void;
};

const ChatMenuItem: FC<ChatMenuItemProps> = ({
  userId,
  closeChat,
  maximizedChat,
}) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState<string>("User Name");
  const [profileImage, setProfileImage] = useState<string>(
    "https://res.cloudinary.com/dxos5na7j/image/upload/v1731177858/assets/images/hno2u07pzd3xh3pu5z3b.png"
  );

  useEffect(() => {
    const createChat = async (userId: string) => {
      const chat = await dispatch(
        createPrivateChat({ recipientId: userId, token: token as string })
      );

      if (chat.payload?.status === 200) {
        const updatedRecipient = chat.payload.data.members.find(
          (member: DefaultUser) => member._id === userId
        );
        setName(updatedRecipient.first_name + " " + updatedRecipient.last_name);
        setProfileImage(updatedRecipient.picture as string);
      }
    };
    createChat(userId);
  }, [dispatch, token, userId]);

  return (
    <ChatButton
      name={name}
      profileImage={profileImage}
      onCloseChat={closeChat}
      onOpenChat={maximizedChat}
    />
  );
};

export default ChatMenuItem;
