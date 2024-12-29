import { createSlice, PayloadAction,  } from "@reduxjs/toolkit";
import { ResponseActionPayload } from "../../../types/types";
import { getFriendsPageInfos, pendingResponse, rejectedResponse, resetMessageAndError } from "../../function";
import { FriendsType } from "../../../types/Friends";




// Define types for user data
export type FriendsState =FriendsType & {
  loading: boolean;
  error: string | null;
  message: string | null;
};


const initialState: FriendsState = {
  friends: [],
  requests: [],
  sentRequests: [],
  loading: false,
  error: null,
  message: null,
};

// Slice
const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    clearFriends: (state) => {
      state.friends = [];
      state.requests = [];
      state.sentRequests = [];
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getFriendsHistory cases
      .addCase(getFriendsPageInfos.pending, (state) => {
        pendingResponse(state)
      })
      .addCase(getFriendsPageInfos.fulfilled, (state, action: PayloadAction<ResponseActionPayload| undefined>) => {
        resetMessageAndError(state);
        state.loading = false;
        state.friends = action.payload?.data.friends;
        state.requests = action.payload?.data.requests;
        state.sentRequests = action.payload?.data.sentRequests;
      })
      .addCase(getFriendsPageInfos.rejected, (state, action: PayloadAction<ResponseActionPayload| undefined>) => {
        rejectedResponse(state, action)
      })
      
      
  },
});
// Export actions
export const { clearFriends } = friendsSlice.actions;

const friendsReducer = friendsSlice.reducer;
// Export reducer
export default friendsReducer;
