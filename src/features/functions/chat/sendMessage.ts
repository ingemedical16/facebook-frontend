import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";
import { Message } from "../../../types/Chat";

// Request body type
type SendMessagePayload = {
  chatId: string;
  content: string;
};

// Response type
type SendMessageResponse = Message;

// Async thunk for sending a message
const sendMessage = createAsyncThunk<
  ResponseActionPayload<SendMessageResponse>,
  SendMessagePayload,
  { rejectValue: ResponseActionPayload }
>("chat/sendMessage", async ({ chatId, content }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `/chat/${chatId}/message`,
      { content }
    );
    return { ...response.data, status: response.status };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data ?? { message: "Unknown error" }
    );
  }
});

export default sendMessage;
