import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import postsReducers from "../features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducers,
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
