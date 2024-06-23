import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slices/sidebarSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    user: userReducer,
  },
});
