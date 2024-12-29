import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserFromCookies } from "../../../utils/token/getUserFromCookies";
import { clearUserFromCookies } from "../../../utils/token";
import {
  login,
  register,
  resetMessageAndError,
  pendingResponse,
  rejectedResponse,
  updateCover,
  updateDetails,
  updateProfilePicture,
} from "../../function";
import { User } from "../../../types/User";
import { ResponseActionPayload } from "../../../types/types";

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
      })
      .addCase(updateCover.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(updateCover.fulfilled, (state, action) => {
        resetMessageAndError(state);
        state.loading = false;
        state.user = state.user ? { ...state.user, cover: action.payload.data?.cover } : null;
        state.message = action.payload.message;
      })
      .addCase(updateCover.rejected, (state, action) => {
        rejectedResponse(state, action);
      })
      .addCase(updateDetails.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(updateDetails.fulfilled, (state, action) => {
        resetMessageAndError(state);
        state.loading = false;
        state.message = action.payload.message;
        state.user = state.user ? { ...state.user, details: action.payload.data?.details } : null;
        
      })
      .addCase(updateDetails.rejected, (state, action) => {
        rejectedResponse(state, action);
      })
      .addCase(updateProfilePicture.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(
        updateProfilePicture.fulfilled,
        (state, action: PayloadAction<ResponseActionPayload<{picture:string;}> | undefined>) => {
          resetMessageAndError(state);
          state.loading = false;
          state.user = { ...state.user as User, picture: action.payload?.data?.picture as string };
        }
      )
      .addCase(
        updateProfilePicture.rejected,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          rejectedResponse(state, action);
        }
      )
  },
});

export const { restUserSlice } = userSlice.actions;
export default userSlice.reducer;
