// features/slices/chat/chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createPrivateChat,
  sendMessage,
  addMemberToChat,
  removeMemberFromChat,
  getChatDetails,
  pendingResponse,
  resetMessageAndError,
  rejectedResponse,
} from "../../functions";
import { ResponseActionPayload } from "../../../types/types";
import { Chat, Message } from "../../../types/Chat";

interface ChatState {
  chats: Chat[];
  currentChat: any | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: ChatState = {
  chats: [],
  currentChat: null,
  loading: false,
  error: null,
  message: null,
};

// Slice
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearChatState: (state) => {
      state.chats = [];
      state.currentChat = null;
      state.error = null;
      state.message = null;
    },
    messageSent: (state, action: PayloadAction<Message & {chatId:string}>) => {
        const { chatId, ...message } = action.payload;
        const chat = state.chats.find((c) => c._id === chatId);
        if (chat) {
          chat.messages.push(message);
        }
      },
      chatCreated: (state, action: PayloadAction<Chat>) => {
        state.chats.push(action.payload);
      },
      memberAdded: (state, action: PayloadAction<Chat>) => {
        const updatedChat = action.payload;
        const chatIndex = state.chats.findIndex((c) => c._id === updatedChat._id);
        if (chatIndex > -1) {
          state.chats[chatIndex] = updatedChat;
        }
      },
      memberRemoved: (state, action: PayloadAction<Chat>) => {
        const updatedChat = action.payload;
        const chatIndex = state.chats.findIndex((c) => c._id === updatedChat._id);
        if (chatIndex > -1) {
          state.chats[chatIndex] = updatedChat;
        }
      },
  },
  extraReducers: (builder) => {
    builder
      // Create private chat
      .addCase(createPrivateChat.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(
        createPrivateChat.fulfilled,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          resetMessageAndError(state);
          state.loading = false;
          state.chats.push(action.payload?.data.chat);
          state.message = action.payload?.message || null;
        }
      )
      .addCase(
        createPrivateChat.rejected,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          rejectedResponse(state, action);
        }
      )
      // Send message
      .addCase(sendMessage.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(
        sendMessage.fulfilled,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          resetMessageAndError(state);
          state.loading = false;
          if (state.currentChat) {
            state.currentChat.messages.push(action.payload?.data.message);
          }
          state.message = action.payload?.message || null;
        }
      )
      .addCase(
        sendMessage.rejected,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          rejectedResponse(state, action);
        }
      )
      // Add member to chat
      .addCase(addMemberToChat.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(
        addMemberToChat.fulfilled,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          resetMessageAndError(state);
          state.loading = false;
          state.message = action.payload?.message || null;
          if (state.currentChat) {
            state.currentChat.members = action.payload?.data.members;
          }
        }
      )
      .addCase(
        addMemberToChat.rejected,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          rejectedResponse(state, action);
        }
      )
      // Remove member from chat
      .addCase(removeMemberFromChat.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(
        removeMemberFromChat.fulfilled,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          resetMessageAndError(state);
          state.loading = false;
          state.message = action.payload?.message || null;
          if (state.currentChat) {
            state.currentChat.members = action.payload?.data.members;
          }
        }
      )
      .addCase(
        removeMemberFromChat.rejected,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          rejectedResponse(state, action);
        }
      )
      // Get chat details
      .addCase(getChatDetails.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(
        getChatDetails.fulfilled,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          resetMessageAndError(state);
          state.loading = false;
          state.currentChat = action.payload?.data.chat;
          state.message = action.payload?.message || null;
        }
      )
      .addCase(
        getChatDetails.rejected,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          rejectedResponse(state, action);
        }
      );
  },
});

export const { clearChatState,  messageSent, chatCreated, memberAdded, memberRemoved } = chatSlice.actions;
const chatReducer = chatSlice.reducer
export default chatReducer;
