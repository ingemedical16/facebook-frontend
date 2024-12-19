import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/slices/auth/authSlice";
import userReducer from "../features/slices/user/userSlice";
import themeReducer from "../features/slices/theme/themeSlice";
import searchReducer from "../features/slices/search/searchSlice";
import postsReducer from "../features/slices/posts/postsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts:postsReducer,
    user: userReducer,
    theme: themeReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
