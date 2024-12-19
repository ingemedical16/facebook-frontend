import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";
import { Post } from "../../../types/Post";

type UserData = { token: string };

// Async thunk for email verification
const getAllPosts = createAsyncThunk<
  ResponseActionPayload<{posts:Post[]}>,
  UserData,
  { rejectValue: ResponseActionPayload }
>("posts/getAllPosts", async (userData: UserData, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      "/posts/getAllPosts",
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

export default getAllPosts;
