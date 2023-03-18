import { configureStore } from "@reduxjs/toolkit";
import { postsReduce } from "./slices/posts";
import { authReducer } from "./slices/auth";

const store = configureStore({
  reducer: { posts: postsReduce, auth: authReducer },
});

export default store;
