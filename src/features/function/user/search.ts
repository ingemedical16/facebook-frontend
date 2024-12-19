import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";

type UserData = { token: string; searchTerm: string };

// Async thunk for email verification
const search = createAsyncThunk<
  ResponseActionPayload,
  UserData,
  { rejectValue: ResponseActionPayload }
>(
  "users/search/:searchTerm",
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.post(
        `/users/search/${userData.searchTerm}`,
        {},
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
  }
);

export default search;
