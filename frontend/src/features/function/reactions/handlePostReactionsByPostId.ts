import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { Reaction } from "../../../types/Reaction";
import { ResponseActionPayload } from "../../../types/types";

type UserData = Reaction & { token: string };

// Async thunk for email verification
const handlePostReactionsByPostId = createAsyncThunk<
  ResponseActionPayload<Reaction>,
  UserData,
  { rejectValue: ResponseActionPayload }
>("reactions/put-reaction", async (userData: UserData, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await axiosInstance.put(
      "/reactions/put-reaction",
      {
        postId: userData.postRef,
        reaction: userData.reaction,
      },
      {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data ?? { message: "Unknown error" }
    );
  }
});

export default handlePostReactionsByPostId;
