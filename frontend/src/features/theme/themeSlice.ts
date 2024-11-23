import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


// Define types for user data
export type ThemeState = {
    isDarkTheme: boolean;
}

// Initialize state based on cookies
const persistedTheme = Cookies.get("theme") || { isDarkTheme: false };

const initialState: ThemeState = {
    isDarkTheme: typeof persistedTheme === "object" ? persistedTheme.isDarkTheme : false,
};


// Slice
const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            const isDarkTheme = !state.isDarkTheme
            state.isDarkTheme =isDarkTheme ;
            Cookies.set("theme", JSON.stringify({ isDarkTheme }), { expires: 365 });
        },
    },
});


// Export actions   
export const { toggleTheme } = themeSlice.actions;

const themeReducer = themeSlice.reducer;
// Export reducer
export default  themeReducer;;