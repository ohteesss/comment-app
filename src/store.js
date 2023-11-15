import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./features/CommentSlice";
import userReducer from "./features/UserSlice";
const store = configureStore({
  reducer: {
    comment: commentReducer,
    user: userReducer,
  },
});

export default store;
