import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";
import { Chat } from "../../../types/Chat";


// Request body type
type CreatePrivateChatPayload = {
  recipientId: string;
};



// Async thunk for creating a private chat
const createPrivateChat = createAsyncThunk<
  ResponseActionPayload<Chat>,
  CreatePrivateChatPayload,
  { rejectValue: ResponseActionPayload }
>("chat/createPrivateChat", async (data, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      "/chat/private",
      data
    );
    return { ...response.data, status: response.status };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data ?? { message: "Unknown error" }
    );
  }
});

export default createPrivateChat;
