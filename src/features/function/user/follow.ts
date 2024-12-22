import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";

type UserData = { token: string; id: string };

// Async thunk for email verification
const follow = createAsyncThunk<
  ResponseActionPayload,
  UserData,
  { rejectValue: ResponseActionPayload }
>("users/follow/:id", async (userData: UserData, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await axiosInstance.put(
      `/users/follow/${userData.id}`,
      {},
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

export default follow;
