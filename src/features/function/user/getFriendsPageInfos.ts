import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";
import { FriendsType } from "../../../types/Friends";

type UserData = { token: string };

// Async thunk for email verification
const getFriendsPageInfos = createAsyncThunk<
  ResponseActionPayload<FriendsType>,
  UserData,
  { rejectValue: ResponseActionPayload }
>(
  "users/getFriendsPageInfos",
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        "/users/getFriendsPageInfos",
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
  }
);

export default getFriendsPageInfos;
