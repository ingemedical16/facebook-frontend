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

import { FriendshipStatus, SearchApiResource } from "../../../types/types";
import { Profile } from "../../../types/Profile";
import { Gender } from "../../../types/User";

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
        state.profile = {
          ...action.payload.data,
          _id: action.payload.data?._id ?? "",
          first_name: action.payload.data?.first_name ?? "",
          last_name: action.payload.data?.last_name?? "",
          username: action.payload.data?.username??"",
          email: action.payload.data?.email?? "",
          gender: action.payload.data?.gender ?? Gender.Other,
          birth_day: action.payload.data?.birth_day ?? 1,
          birth_month: action.payload.data?.birth_month?? 1,
          birth_year: action.payload.data?.birth_year?? new Date().getFullYear(),
          picture: action.payload.data?.picture?? "",
          posts: action.payload.data?.posts?? [],
          friendship: action.payload.data?.friendship?? {
            friends: action.payload.data?.friendship?.friends?? false,
            following: action.payload.data?.friendship?.following?? false,
            requestSent: action.payload.data?.friendship?.requestSent?? false,
            requestReceived: action.payload.data?.friendship?.requestReceived?? false,
          } as FriendshipStatus,
          
          
        } ;
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
