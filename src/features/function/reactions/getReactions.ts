import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";
import { ReactionsData } from "../../../types/Reaction";

type UserData = { token: string; id: string };

// Async thunk for email verification
const getReactions = createAsyncThunk<
  ResponseActionPayload<ReactionsData>,
  UserData,
  { rejectValue: ResponseActionPayload }
>(
  "reactions/getPostReactions/:id",
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        `/reactions/getPostReactions/${userData.id}`,
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
  }
);

export default getReactions;
