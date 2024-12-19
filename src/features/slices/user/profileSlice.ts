import { createSlice } from "@reduxjs/toolkit";
import { clearUserFromCookies } from "../../../utils/token";
import {
  resetMessageAndError,
  pendingResponse,
  rejectedResponse,
  getProfileByUsername,
  createPost,
  searchImagesInCloud,
} from "../../function";
import { Profile } from "../../../types/User";
import { SearchApiResource } from "../../../types/types";

interface profileState {
  profile: Profile | null;
  loading: boolean;
  resources: SearchApiResource[];
  error: string | null;
  message: string | null;
}

const initialState: profileState = {
  profile: null,
  loading: false,
  resources: [],
  error: null,
  message: null,
};

// Slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    restProfileSlice: (state) => {
      clearUserFromCookies();
      state.profile = null;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(getProfileByUsername.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(getProfileByUsername.fulfilled, (state, action) => {
     
        resetMessageAndError(state);
        state.loading = false;
        state.profile = action.payload.data || null;
        state.message = action.payload.message;
      })
      .addCase(getProfileByUsername.rejected, (state, action) => {
        rejectedResponse(state, action);
      })
      .addCase(createPost.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(createPost.fulfilled, (state, action) => {
        resetMessageAndError(state);
        if (action.payload.data && action.payload.data.isProfile) {
          state.loading = false;
          state.profile?.posts.push(action.payload.data?.post);
          state.message = action.payload.message;
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        rejectedResponse(state, action);
      })
      .addCase(searchImagesInCloud.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(searchImagesInCloud.fulfilled, (state, action) => {
        resetMessageAndError(state);
        state.loading = false;
        state.message = action.payload.message;
        state.resources = action.payload.data?.resources || [];
      })
      .addCase(searchImagesInCloud.rejected, (state, action) => {
        rejectedResponse(state, action);
      });
  },
});

export const { restProfileSlice } = profileSlice.actions;
export default profileSlice.reducer;
