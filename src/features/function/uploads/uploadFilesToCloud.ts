import {UploadApiResponse } from "cloudinary";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseActionPayload } from "../../../types/types";
import uploadFilesToCloudAPI from "./uploadFilesToCloudAPI";

type UserData = { token: string;  formData: FormData };

// Async thunk for email verification
const uploadFilesToCloud = createAsyncThunk<
  ResponseActionPayload<{files:UploadApiResponse[]}>,
  UserData,
  { rejectValue: ResponseActionPayload }
>(
  "uploads/uploadFilesToCloud",
  async (userData: UserData, { rejectWithValue }) => {
    try {
      return await uploadFilesToCloudAPI(userData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data ?? { message: "Unknown error" });
    }
  }
);

export default uploadFilesToCloud;
