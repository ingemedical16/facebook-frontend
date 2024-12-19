import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { UserDetails } from "../../../types/User";
import { ResponseActionPayload } from "../../../types/types";

type UserData = { token: string; infos: UserDetails };

// Async thunk for email verification
const updateDetails = createAsyncThunk<
  ResponseActionPayload,
  UserData,
  { rejectValue: ResponseActionPayload }
>("users/updateDetails", async (userData: UserData, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await axiosInstance.put(
      "/users/updateDetails",
      {
        infos: userData.infos,
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

export default updateDetails;
