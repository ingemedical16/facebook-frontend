import { createSlice } from "@reduxjs/toolkit";
import { getUserFromCookies } from "../../../utils/token/getUserFromCookies";
import { clearUserFromCookies } from "../../../utils/token";
import {
  login,
  register,
  resetMessageAndError,
  pendingResponse,
  rejectedResponse,
} from "../../function";
import { User } from "../../../types/User";

interface userState {
  user: User | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

// Initialize state based on cookies
const persisteduser = getUserFromCookies();

const initialState: userState = {
  user: persisteduser?.user || null,
  loading: false,
  error: null,
  message: null,
};

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    restUserSlice: (state) => {
      clearUserFromCookies();
      state.user = null;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(register.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(register.fulfilled, (state, action) => {
        resetMessageAndError(state);
        state.loading = false;
        state.user = action.payload.data?.user || null;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        rejectedResponse(state, action);
      })
      .addCase(login.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(login.fulfilled, (state, action) => {
        resetMessageAndError(state);
        state.loading = false;
        state.user = action.payload.data?.user || null;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        rejectedResponse(state, action);
      });
  },
});

export const { restUserSlice } = userSlice.actions;
export default userSlice.reducer;
