import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";
import { Chat } from "../../../types/Chat";
import { DefaultUser } from "../../../types/Post";


// Request body type
type CreatePrivateChatPayload = {
  recipientId: string;
  token: string;
};



// Async thunk for creating a private chat
const createPrivateChat = createAsyncThunk<
  ResponseActionPayload<Chat<DefaultUser>>,
  CreatePrivateChatPayload,
  { rejectValue: ResponseActionPayload }
>("chat/createPrivateChat", async (userData, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<ResponseActionPayload<Chat<DefaultUser>>> = await axiosInstance.post(
      "/chat/private",
      {recipientId:userData.recipientId},
      {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      }
    );
    return { ...response.data, status: response.status };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data ?? { message: "Unknown error" }
    );
  }
});

export default createPrivateChat;
