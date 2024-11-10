import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios";

// Define types for user data
interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  picture?: string;
  verified: boolean;
  token: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  message: null,
};

// Async thunk for registration
export const register = createAsyncThunk(
  "auth/register",
  async (userData: Omit<User, "id" | "verified" | "token">, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/register", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for email verification
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/verify-email", { token });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/login", credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Verify email cases
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
