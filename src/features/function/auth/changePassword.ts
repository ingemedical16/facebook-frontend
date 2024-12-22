import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";

type UserData = { email: string; password: string };
const changePassword = createAsyncThunk<
  ResponseActionPayload,
  UserData,
  { rejectValue: ResponseActionPayload }
>("auth/changePassword", async (credentials: UserData, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      "/auth/changePassword",
      credentials
    );
    return {...response.data, status:response.status};
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data ?? { message: "Unknown error" }
    );
  }
});

export default changePassword;
