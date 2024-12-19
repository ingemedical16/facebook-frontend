import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";

type UserData = { token: string; id: string };

// Async thunk for email verification
const deleteRequest = createAsyncThunk<
  ResponseActionPayload,
  UserData,
  { rejectValue: ResponseActionPayload }
>(
  "users/deleteRequest/:id",
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.put(
        `/users/deleteRequest/${userData.id}`,
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

export default deleteRequest;
