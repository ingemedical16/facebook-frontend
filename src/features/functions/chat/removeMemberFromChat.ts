import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";
import { Chat } from "../../../types/Chat";
import { DefaultUser } from "../../../types/Post";

// Request body type
type RemoveMemberPayload = {
  chatId: string;
  memberId: string;
  token: string;
};

// Response type
type RemoveMemberResponse = Chat<DefaultUser>;

// Async thunk for removing a member from a chat
const removeMemberFromChat = createAsyncThunk<
  ResponseActionPayload<RemoveMemberResponse>,
  RemoveMemberPayload,
  { rejectValue: ResponseActionPayload }
>("chat/removeMemberFromChat", async ({ chatId, memberId,token }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await axiosInstance.put(
      `/chat/${chatId}/member`,
      { data: { memberId } },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return { ...response.data, status: response.status };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data ?? { message: "Unknown error" }
    );
  }
});

export default removeMemberFromChat;
