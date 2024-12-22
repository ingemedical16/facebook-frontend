import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../../types/User";
import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";

// Define types for user data
type UserData = Omit<
  User & { password: string },
  "id" | "verified" | "username"
>;
type ResponseData = {
  token: string
  user: User;
}

// Async thunk for registration
const register = createAsyncThunk<
  ResponseActionPayload<ResponseData>,
  UserData,
  { rejectValue: ResponseActionPayload }
>("auth/register", async (userData: UserData, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      "/auth/register",
      userData
    );
    return {...response.data, status:response.status};
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data ?? { message: "Unknown error" }
    );
  }
});

export default register;
