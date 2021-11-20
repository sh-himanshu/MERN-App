import * as api from "../../api";

import { CREATE, DELETE, FETCH_ALL, UPDATE, LIKE } from "./constants/actionTypes";
import { Post, PostRespose } from "../../api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async Reducers
export const fetchPosts = createAsyncThunk(FETCH_ALL, async (_, thunkAPI) => {
  try {
    const { data } = await api.fetchPosts();
    return data;
  } catch (error) {
    if (error instanceof Error) thunkAPI.rejectWithValue(error.message);
  }
});

export const createPost = createAsyncThunk(CREATE, async (post: Post, thunkAPI) => {
  try {
    const { data } = await api.createPost(post);
    return data;
  } catch (error) {
    if (error instanceof Error) thunkAPI.rejectWithValue(error.message);
  }
});

export const likePost = createAsyncThunk(LIKE, async (post: PostRespose, thunkAPI) => {
  post.likeCount++;
  try {
    const { data } = await api.updatePost(post._id, post);
    return data;
  } catch (error) {
    if (error instanceof Error) thunkAPI.rejectWithValue(error.message);
  }
});

export const updatePost = createAsyncThunk(
  UPDATE,
  async ({ _id, post }: { _id: string; post: Post }, thunkAPI) => {
    try {
      const { data } = await api.updatePost(_id, post);
      return data;
    } catch (error) {
      if (error instanceof Error) thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(DELETE, async (id: string, thunkAPI) => {
  try {
    const { data } = await api.deletePost(id);
    return data;
  } catch (error) {
    if (error instanceof Error) thunkAPI.rejectWithValue(error.message);
  }
});

const initialState: PostRespose[] = [];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (_, action) => action.payload)
      .addCase(createPost.fulfilled, (state, action) =>
        action.payload ? [...state, action.payload] : state
      )
      .addCase(updatePost.fulfilled, (state, action) =>
        state.map((post) => (post._id === action.payload!._id ? action.payload! : post))
      )
      .addCase(likePost.fulfilled, (state, action) =>
        state.map((post) => (post._id === action.payload!._id ? action.payload! : post))
      )
      .addCase(deletePost.fulfilled, (state, action) =>
        state.filter((post) => post._id !== action.payload!._id)
      );
  },
});

export default postsSlice.reducer;
