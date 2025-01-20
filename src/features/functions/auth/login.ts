import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";
import { User } from "../../../types/User";

type UserData = { email: string; password: string };

type ResponseData = {
  token: string
  user: User;
}
// Async thunk for login
const login = createAsyncThunk<
  ResponseActionPayload<ResponseData>,
  UserData,
  { rejectValue: ResponseActionPayload }
>("auth/login", async (credentials: UserData, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      "/auth/login",
      credentials
    );
    return {...response.data, status:response.status};
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data ?? { message: "Unknown error" }
    );
  }
});

export default login;
