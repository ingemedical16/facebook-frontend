import React, { createContext, useContext, useEffect, ReactNode, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  chatUpdated,
  chatCreated,
} from "../../../features/slices/chat/chatSlice";
import {
  initializeSocket,
  disconnectSocket,
} from "../../../services/socketService";
import { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { DefaultUser } from "../../../types/Post";

interface ChatProviderProps {
  children: ReactNode;
}

const ChatContext = createContext<Socket | null>(null);

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.user?._id);
  const socket = useMemo(() => initializeSocket(), []);
  useEffect(()=>{
    if (socket) {
      socket.emit("register", userId);
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  },[socket, userId]);

  useEffect(() => {
    socket.on("message_sent", (data) => {
      console.log("New message received:", data);
      dispatch(chatUpdated(data));
    });

    socket.on("chat_created", (data) => {
      const isUserMember = data.members.some((member:DefaultUser) => member._id === userId);
      if(isUserMember){
        dispatch(chatCreated(data));
      }
    });

    socket.on("member_added", (data) => {
      dispatch(chatUpdated(data));
    });

    socket.on("member_removed", (data) => {
      dispatch(chatUpdated(data));
    });

    return () => {
      disconnectSocket();
    };
  }, [dispatch, socket, userId]);

  return <ChatContext.Provider value={socket}>{children}</ChatContext.Provider>;
};

export const useChat = () => useContext(ChatContext);
