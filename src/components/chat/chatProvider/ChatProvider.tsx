import React, { createContext, useContext, useEffect, ReactNode } from "react";
import { useDispatch } from "react-redux";
import {
  messageSent,
  chatCreated,
  memberAdded,
  memberRemoved,
} from "../../../features/slices/chat/chatSlice";
import {
  initializeSocket,
  disconnectSocket,
} from "../../../services/socketService";
import { Socket } from "socket.io-client";

interface ChatProviderProps {
  children: ReactNode;
}

const ChatContext = createContext<Socket | null>(null);

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const socket = initializeSocket();
  useEffect(() => {
    socket.on("message_sent", (data) => {
      dispatch(messageSent(data));
    });

    socket.on("chat_created", (data) => {
      dispatch(chatCreated(data));
    });

    socket.on("member_added", (data) => {
      dispatch(memberAdded(data));
    });

    socket.on("member_removed", (data) => {
      dispatch(memberRemoved(data));
    });

    return () => {
      disconnectSocket();
    };
  }, [dispatch, socket]);

  return <ChatContext.Provider value={socket}>{children}</ChatContext.Provider>;
};

export const useChat = () => useContext(ChatContext);
