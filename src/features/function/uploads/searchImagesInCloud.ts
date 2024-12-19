import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload, SearchApiResponse } from "../../../types/types";

type UserData = {
  token: string;
  path: string;
  sort: "asc" | "desc";
  max: number;
};

// Async thunk for email verification
const searchImagesInCloud = createAsyncThunk<
  ResponseActionPayload<SearchApiResponse>,
  UserData,
  { rejectValue: ResponseActionPayload }
>("uploads/listImages", async (userData: UserData, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      "/uploads/listImages",
      {
        path: userData.path,
        sort: userData.sort,
        max: userData.max,
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

export default searchImagesInCloud;
