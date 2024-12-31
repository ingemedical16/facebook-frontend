import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";
import { DefaultUser } from "../../../types/Post";

type UserData = { email: string };
const searchUserByEmail = createAsyncThunk<
  ResponseActionPayload<DefaultUser>,
  UserData,
  { rejectValue: ResponseActionPayload }
>("users/search-user", async (userData: UserData, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<ResponseActionPayload<DefaultUser>> = await axiosInstance.post(
      "/users/search-user",
      userData
    );
    return { ...response.data, status: response.status };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data ?? { message: "Unknown error" }
    );
  }
});

export default searchUserByEmail;
