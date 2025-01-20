import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";
import { Comment as CommentType } from "../../../types/Post";

type UserData = {
  token: string;
  comment: string;
  image: string;
  postId: string;
};
type ResponseData = {
  comments: CommentType[];
  postId: string;
};

// Async thunk for email verification
const comment = createAsyncThunk<
  ResponseActionPayload<ResponseData>,
  UserData,
  { rejectValue: ResponseActionPayload }
>("posts/comment", async (userData: UserData, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await axiosInstance.put(
      "/posts/comment",
      {
        comment: userData.comment,
        image: userData.image,
        postId: userData.postId,
      },
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

export default comment;
