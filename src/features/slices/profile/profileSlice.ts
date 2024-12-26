import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProfileByUsername, pendingResponse, rejectedResponse, resetMessageAndError } from "../../function";
import { ResponseActionPayload } from "../../../types/types";
import { Profile } from "../../../types/Profile";

// Define types for user data
export type ProfileState = {
  profile?: Profile;
  loading: boolean;
  error: string | null;
  message: string | null;
};

const initialState: ProfileState = {
  loading: false,
  error: null,
  message: null,
};

// Slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = undefined;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getProfileHistory cases
      .addCase(getProfileByUsername.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(
        getProfileByUsername.fulfilled,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          resetMessageAndError(state);
          state.loading = false;
          state.profile = action.payload?.data.profile;
        }
      )
      .addCase(
        getProfileByUsername.rejected,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          rejectedResponse(state, action);
        }
      )

      
  },
});
// Export actions
export const { clearProfile } = profileSlice.actions;

const profileReducer = profileSlice.reducer;
// Export reducer
export default profileReducer;
