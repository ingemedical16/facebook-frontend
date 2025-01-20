import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/slices/auth/authSlice";
import userReducer from "../features/slices/user/userSlice";
import themeReducer from "../features/slices/theme/themeSlice";
import searchReducer from "../features/slices/search/searchSlice";
import postsReducer from "../features/slices/posts/postsSlice";
import profileReducer from "../features/slices/profile/profileSlice";
import friendsReducer from "../features/slices/friends/friendsSlice";
import chatReducer from "../features/slices/chat/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts:postsReducer,
    user: userReducer,
    friends:friendsReducer,
    profile:profileReducer,
    theme: themeReducer,
    search: searchReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
