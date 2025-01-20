import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserFromCookies } from "../../../utils/token/getUserFromCookies";
import { clearUserFromCookies, storeTokenAndUser } from "../../../utils/token";
import {
  login,
  register,
  sendVerification,
  verifyEmail,
  resetMessageAndError,
  pendingResponse,
  rejectedResponse,
} from "../../functions";
import { ResponseActionPayload } from "../../../types/types";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  message: string | null;
  token: string | null;
}

// Initialize state based on cookies
const persistedAuth = getUserFromCookies();

const initialState: AuthState = {
  isAuthenticated: persistedAuth?.token ? true : false,
  token: persistedAuth?.token || null,
  loading: false,
  error: null,
  message: null,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.message = null;
      state.error = null;
      clearUserFromCookies();
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(register.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          resetMessageAndError(state);
          state.loading = false;
          state.isAuthenticated = true;
          state.message = action.payload?.message || null;
          state.token = action.payload?.data.token;
          storeTokenAndUser(
            action.payload?.data.token,
            action.payload?.data.user
          );
        }
      )
      .addCase(
        register.rejected,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          rejectedResponse(state, action);
        }
      )
      // Verify email cases
      .addCase(verifyEmail.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(
        verifyEmail.fulfilled,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          resetMessageAndError(state);
          state.loading = false;
          state.message = action.payload?.message || null;
        }
      )
      .addCase(
        verifyEmail.rejected,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          rejectedResponse(state, action);
        }
      )
      // Login cases
      .addCase(login.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          resetMessageAndError(state);
          state.loading = false;
          state.isAuthenticated = true;
          state.message = action.payload?.message || null;
          state.token = action.payload?.data.token;
          storeTokenAndUser(
            action.payload?.data.token,
            action.payload?.data.user
          );
        }
      )
      .addCase(
        login.rejected,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          rejectedResponse(state, action);
        }
      )
      // Send verification cases
      .addCase(sendVerification.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(
        sendVerification.fulfilled,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          resetMessageAndError(state);
          state.loading = false;
          state.message = action.payload?.message || null;
        }
      )
      .addCase(
        sendVerification.rejected,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          rejectedResponse(state, action);
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
