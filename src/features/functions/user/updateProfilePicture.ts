import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";

type UserData = { token: string; url: string };
type ResponseData = {
  picture: string;
}

// Async thunk for email verification
const updateProfilePicture = createAsyncThunk<
  ResponseActionPayload<ResponseData>,
  UserData,
  { rejectValue: ResponseActionPayload }
>(
  "users/updateProfilePicture",
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.put(
        "/users/updateProfilePicture",
        {
          url: userData.url,
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
  }
);

export default updateProfilePicture;
