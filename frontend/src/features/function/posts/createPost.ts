import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { Post } from "../../../types/Post";
import { ResponseActionPayload } from "../../../types/types";

type UserData = Omit<Post<string> & { token: string, isProfile:boolean }, "_id">;
type ResponseData = {
  post: Post;
  isProfile: boolean;
}

// Async thunk for email verification
const createPost = createAsyncThunk<
  ResponseActionPayload<ResponseData>,
  UserData,
  { rejectValue: ResponseActionPayload }
>("posts/createPost", async (userData: UserData, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      "/posts/createPost",
      {
        type: userData.type,
        background: userData.background,
        text: userData.text,
        images: userData.images,
        user: userData.user,
        isProfile: userData.isProfile,
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

export default createPost;
