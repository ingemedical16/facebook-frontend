import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";
import { Chat } from "../../../types/Chat";
import { DefaultUser } from "../../../types/Post";
import { generateToken } from '../../../../../facebook-backend/src/helpers/token';

// Request body type
type AddMemberPayload = {
  chatId: string;
  memberId: string;
  token: string;
};

// Response type
type AddMemberResponse = Chat<DefaultUser>;

// Async thunk for adding a member to a chat
const addMemberToChat = createAsyncThunk<
  ResponseActionPayload<AddMemberResponse>,
  AddMemberPayload,
  { rejectValue: ResponseActionPayload }
>("chat/addMemberToChat", async ({ chatId, memberId, token }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `/chat/${chatId}/member`,
      { memberId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

export default addMemberToChat;
