import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addToSearchHistory,
  getSearchHistory,
  pendingResponse,
  rejectedResponse,
  removeFromSearchHistory,
  resetMessageAndError,
  search,
} from "../../functions";
import { ResponseActionPayload } from "../../../types/types";

export type SearchResult = {
  _id: string;
  first_name: string;
  last_name: string;
  username: string;
  picture: string;
};
// Define types for user data
export type SearchState = {
  search: SearchResult[];
  searchResult: SearchResult[];
  loading: boolean;
  error: string | null;
  message: string | null;
};

const initialState: SearchState = {
  search: [],
  searchResult: [],
  loading: false,
  error: null,
  message: null,
};

// Slice
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearchResult: (state) => {
      state.searchResult = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // getSearchHistory cases
      .addCase(getSearchHistory.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(
        getSearchHistory.fulfilled,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          resetMessageAndError(state);
          state.loading = false;
          state.search = action.payload?.data.search;
        }
      )
      .addCase(
        getSearchHistory.rejected,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          rejectedResponse(state, action);
        }
      )

      // addToSearchHistory cases
      .addCase(addToSearchHistory.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(
        addToSearchHistory.fulfilled,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          resetMessageAndError(state);
          state.loading = false;
          state.message = action.payload?.message || null;
          state.search = action.payload?.data.search;
        }
      )
      .addCase(
        addToSearchHistory.rejected,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          rejectedResponse(state, action);
        }
      )
      // removeFromSearchHistory cases
      .addCase(removeFromSearchHistory.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(
        removeFromSearchHistory.fulfilled,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          resetMessageAndError(state);
          state.loading = false;
          state.message = action.payload?.message || null;
          state.search = action.payload?.data.search;
        }
      )
      .addCase(
        removeFromSearchHistory.rejected,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          rejectedResponse(state, action);
        }
      )
      // search cases
      .addCase(search.pending, (state) => {
        pendingResponse(state);
      })
      .addCase(
        search.fulfilled,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          resetMessageAndError(state);
          state.loading = false;
          state.searchResult = action.payload?.data.searchResult;
        }
      )
      .addCase(
        search.rejected,
        (state, action: PayloadAction<ResponseActionPayload | undefined>) => {
          rejectedResponse(state, action);
        }
      );
  },
});
// Export actions
export const { clearSearchResult } = searchSlice.actions;

const searchReducer = searchSlice.reducer;
// Export reducer
export default searchReducer;
