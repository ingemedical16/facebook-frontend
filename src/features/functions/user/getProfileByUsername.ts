import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { axiosInstance } from "../../../api/axios";
import { ResponseActionPayload } from "../../../types/types";
import { Profile } from "../../../types/Profile";

type UserData = { token: string; username: string };

// Async thunk for email verification
const getProfileByUsername = createAsyncThunk<
  ResponseActionPayload<Profile>,
  UserData,
  { rejectValue: ResponseActionPayload }
>(
  "users/getProfile/:username",
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        `/users/getProfile/${userData.username}`,
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

export default getProfileByUsername;
