import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../../../types/Post";
import {
  comment,
  createPost,
  getAllPosts,
  pendingResponse,
  rejectedResponse,
  resetMessageAndError,
} from "../../function";

interface postsState {
  posts: Post[] | null; // the following posts and user posts
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: postsState = {
  posts: [],
  loading: false,
  error: null,
  message: null,
};

// Slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Posts cases
      .addCase(getAllPosts.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        resetMessageAndError(state);
        state.loading = false;
        state.posts = action.payload.data?.posts || [];
        state.message = action.payload.message;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        rejectedResponse(state, action);
      })
      .addCase(comment.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(comment.fulfilled, (state, action) => {
        resetMessageAndError(state);

        if (state.posts !== null) {
          const postIndex = state.posts.findIndex(
            (post) => post._id === action.payload.data?.postId
          );

          if (postIndex !== -1) {
            state.posts[postIndex].comments =
              action.payload.data?.comments || [];
          }
        }

        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(comment.rejected, (state, action) => {
        rejectedResponse(state, action);
      })
      .addCase(createPost.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(createPost.fulfilled, (state, action) => {
        resetMessageAndError(state);
        if (action.payload.data && !action.payload.data.isProfile) {
          state.loading = false;
          state.posts?.push(action.payload.data?.post);
          state.message = action.payload.message;
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        rejectedResponse(state, action);
      });
  },
});
const postsReducer = postsSlice.reducer;
export default postsReducer;
