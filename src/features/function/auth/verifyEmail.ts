import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";

type UserData = { token: string; verifyToken: string };

// Async thunk for email verification
const verifyEmail = createAsyncThunk<
  ResponseActionPayload,
  UserData,
  { rejectValue: ResponseActionPayload }
>("auth/verifyEmail", async (userData: UserData, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      "/auth/verify-email",
      {
        token: userData.verifyToken,
      },
      {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      }
    );
    return {...response.data, status:response.status};
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data ?? { message: "Unknown error" }
    );
  }
});

export default verifyEmail;
