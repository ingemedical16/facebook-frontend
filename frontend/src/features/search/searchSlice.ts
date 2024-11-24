import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { axiosInstance } from "../../api/axios";
import { resetMessageAndError } from "../resteMessageAndError";

const slicePath = "/users"

export type SearchResult = {
    id: string;
    first_name:string;
    last_name: string;
    username:string;
    picture:string;
}
// Define types for user data
export type SearchState = {
    search: SearchResult[];
    searchResult: SearchResult[];
    loading: boolean;
    error: string | null;
    message: string | null;
}

export const search = createAsyncThunk("search",async (
    userData: { token: string; searchTerm: string }, 
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post( `${slicePath}/search/${userData.searchTerm}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  })
 
  export const getSearchHistory = createAsyncThunk("search/getSearchHistory", async (
    userData: { token: string }, 
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`${slicePath}/getSearchHistory`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  })

  export const addToSearchHistory = createAsyncThunk("search/addToSearchHistory", async (
    userData: { token: string; searchResult: SearchResult }, 
    { rejectWithValue }
  ) => {
    try {
        const response = await axiosInstance.put(`${slicePath}/addToSearchHistory`,
        userData.searchResult,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        });
       return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
  );
  export const removeFromSearchHistory = createAsyncThunk("search/removeFromSearchHistory", async (
    userData: { token: string; searchResultId: string }, 
    { rejectWithValue }
  ) => {
    try {
        const response = await axiosInstance.put(`${slicePath}/removeFromSearchHistory`,
        { id: userData.searchResultId },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        });
        return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
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
            state.searchResult = []
          },
    },
    extraReducers: (builder) => {
        builder
          // getSearchHistory cases
          .addCase(getSearchHistory.pending, (state) => {
            resetMessageAndError(state);
            state.loading = true;
            state.error = null;
          })
          .addCase(getSearchHistory.fulfilled, (state, action) => {
            resetMessageAndError(state);
            state.loading = false;
            state.search = action.payload.search;
            
    
          })
          .addCase(getSearchHistory.rejected, (state, action) => {
            resetMessageAndError(state);
            state.loading = false;
            state.error = action.payload as string;
          })
          // addToSearchHistory cases
          .addCase(addToSearchHistory.pending, (state) => {
            resetMessageAndError(state);
            state.loading = true;
            state.error = null;
          })
          .addCase(addToSearchHistory.fulfilled, (state, action) => {
            resetMessageAndError(state);
            state.loading = false;
            state.message = action.payload.message;
            state.search = action.payload.search;
          })
          .addCase(addToSearchHistory.rejected, (state, action) => {
            resetMessageAndError(state);
            state.loading = false;
            state.error = action.payload as string;
          })
          // removeFromSearchHistory cases
          .addCase(removeFromSearchHistory.pending, (state) => {
            resetMessageAndError(state);
            state.loading = true;
            state.error = null;
          })
          .addCase(removeFromSearchHistory.fulfilled, (state, action) => {
            resetMessageAndError(state);
            state.loading = false;
            state.message = action.payload.message;
            state.search = action.payload.search;
          })
          .addCase(removeFromSearchHistory.rejected, (state, action) => {
            resetMessageAndError(state);
            state.loading = false;
            state.error = action.payload as string;
          })
          // search cases
          .addCase(search.pending, (state) => {
            resetMessageAndError(state);
            state.loading = true;
            state.error = null;
          })
          .addCase(search.fulfilled, (state, action) => {
            resetMessageAndError(state);
            state.loading = false;
           state.searchResult = action.payload.searchResult;
          })
          .addCase(search.rejected, (state, action) => {
            resetMessageAndError(state);
            state.loading = false;
            state.error = action.payload as string;
          })

          
      },
      
});


// Export actions   
export const { clearSearchResult } = searchSlice.actions;

const searchReducer = searchSlice.reducer;
// Export reducer
export default  searchReducer;;