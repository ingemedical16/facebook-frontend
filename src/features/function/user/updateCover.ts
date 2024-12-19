import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";

type UserData = { token: string; url: string };

// Async thunk for email verification
const updateCover = createAsyncThunk<
  ResponseActionPayload,
  UserData,
  { rejectValue: ResponseActionPayload }
>("users/updateCover", async (userData: UserData, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await axiosInstance.put(
      "/users/updateCover",
      {
        url: userData.url,
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

export default updateCover;
