import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createPost,
  getProfileByUsername,
  pendingResponse,
  rejectedResponse,
  resetMessageAndError,
  searchImagesInCloud,
  updateCover,
  updateProfilePicture,
} from "../../functions";
import { ResponseActionPayload, SearchApiResource } from "../../../types/types";
import { Profile } from "../../../types/Profile";

// Define types for user data
export type ProfileState = {
  profile?: Profile;
  resources: SearchApiResource[];
  loading: boolean;
  error: string | null;
  message: string | null;
};

const initialState: ProfileState = {
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
          state.profile = action.payload?.data.profile;
          state.loading = false;
        }
      )
      .addCase(
        getProfileByUsername.rejected,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          rejectedResponse(state, action);
        }
      )
      .addCase(updateCover.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(
        updateCover.fulfilled,
        (
          state,
          action: PayloadAction<
            ResponseActionPayload<{ cover: string }> | undefined
          >
        ) => {
          resetMessageAndError(state);
          state.loading = false;
          state.profile = {
            ...(state.profile as Profile),
            cover: action.payload?.data?.cover as string,
          };
        }
      )
      .addCase(
        updateCover.rejected,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          rejectedResponse(state, action);
        }
      )
      .addCase(updateProfilePicture.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(
        updateProfilePicture.fulfilled,
        (
          state,
          action: PayloadAction<
            ResponseActionPayload<{ picture: string }> | undefined
          >
        ) => {
          resetMessageAndError(state);
          state.loading = false;
          state.profile = {
            ...(state.profile as Profile),
            picture: action.payload?.data?.picture as string,
          };
        }
      )
      .addCase(
        updateProfilePicture.rejected,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          rejectedResponse(state, action);
        }
      )
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
// Export actions
export const { clearProfile } = profileSlice.actions;

const profileReducer = profileSlice.reducer;
// Export reducer
export default profileReducer;
