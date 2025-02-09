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
  import { Chat } from "../../../types/Chat";
  import { DefaultUser } from "../../../types/Post";

  interface ChatState {
    chats: Chat<DefaultUser>[];
    loading: boolean;
    error: string | null;
    message: string | null;
  }

  const initialState: ChatState = {
    chats: [],
    loading: false,
    error: null,
    message: null,
  };

  const addChatIfNotExists = (state: ChatState, chat: Chat<DefaultUser>) => {
    if (!state.chats.some((c) => c._id === chat._id)) {
      state.chats.push(chat);
    }
  };

  // Slice
  const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
      clearChatState: (state) => {
        state.chats = [];
        state.error = null;
        state.message = null;
      },
      chatCreated: (state, action: PayloadAction<Chat<DefaultUser>>) => {
        addChatIfNotExists(state, action.payload);
      },
      chatUpdated: (state, action: PayloadAction<Chat<DefaultUser>>) => {
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
            if (action.payload?.data) {
              addChatIfNotExists(state, action.payload.data);
            }
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
            const chat = state.chats.find((c) => c._id === action.payload?.data.chatId);
            if (chat) {
              chat.messages.push(action.payload?.data.message);
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
        // Add & Remove members
        .addCase(addMemberToChat.fulfilled, (state, action:PayloadAction<ResponseActionPayload | undefined>) => {
          resetMessageAndError(state);
          state.loading = false;
          state.message = action.payload?.message || null;
          const chat = state.chats.find((c) => c._id === action.payload?.data?._id);
          if (chat && chat !== undefined) {
            chat.members = action.payload?.data?.members;
          }
        })
        .addCase(removeMemberFromChat.fulfilled, (state, action:PayloadAction<ResponseActionPayload | undefined>) => {
          resetMessageAndError(state);
          state.loading = false;
          state.message = action.payload?.message || null;
          const chat = state.chats.find((c) => c._id === action.payload?.data._id);
          if (chat) {
            chat.members = action.payload?.data.members;
          }
        })
        // Get chat details
        .addCase(getChatDetails.fulfilled, (state, action) => {
          resetMessageAndError(state);
          state.loading = false;
          addChatIfNotExists(state, action.payload?.data as Chat<DefaultUser>);
          state.message = action.payload?.message || null;
        });
    },
  });

  export const { clearChatState, chatCreated, chatUpdated } = chatSlice.actions;
  export default chatSlice.reducer;
