import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";
import { Chat } from "../../../types/Chat";
import { DefaultUser } from "../../../types/Post";

// Request params type
type GetChatDetailsPayload = {
  chatId: string;
};

// Response type
type GetChatDetailsResponse = Chat<DefaultUser>;

// Async thunk for retrieving chat details
const getChatDetails = createAsyncThunk<
  ResponseActionPayload<GetChatDetailsResponse>,
  GetChatDetailsPayload,
  { rejectValue: ResponseActionPayload }
>("chat/getChatDetails", async ({ chatId }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await axiosInstance.get(`/chat/${chatId}`);
    return { ...response.data, status: response.status };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data ?? { message: "Unknown error" }
    );
  }
});

export default getChatDetails;
