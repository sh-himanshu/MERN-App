import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import postsReducers from "../features/posts/postsSlice";
import authReducers from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducers,
    auth: authReducers,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
