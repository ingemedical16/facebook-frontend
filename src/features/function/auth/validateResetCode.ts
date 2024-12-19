import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";

type UserData = { email: string; code: string };
const validateResetCode = createAsyncThunk<
  ResponseActionPayload,
  UserData,
  { rejectValue: ResponseActionPayload }
>("auth/validateResetCode", async (userData: UserData, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      "/auth/validateResetCode",
      userData
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data ?? { message: "Unknown error" }
    );
  }
});

export default validateResetCode;
