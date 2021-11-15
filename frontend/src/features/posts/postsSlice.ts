import * as api from "../../api";

import { CREATE, DELETE, FETCH_ALL, UPDATE } from "./constants/actionTypes";
import { Post, PostRespose } from "../../api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async Reducers
export const fetchPosts = createAsyncThunk(FETCH_ALL, async (_, thunkAPI) => {
  try {
    const response = await api.fetchPosts();
    return response.data;
  } catch (error) {
    if (error instanceof Error) thunkAPI.rejectWithValue(error.message);
  }
});

export const createPost = createAsyncThunk(CREATE, async (post: Post, thunkAPI) => {
  try {
    const response = await api.createPost(post);
    return response.data;
  } catch (error) {
    if (error instanceof Error) thunkAPI.rejectWithValue(error.message);
  }
});

export const updatePost = createAsyncThunk(
  UPDATE,
  async (params: { id: string; updatedPost: Post }, thunkAPI) => {
    const { id, updatedPost } = params;
    try {
      const response = await api.updatePost(id, updatedPost);
      return response.data;
    } catch (error) {
      if (error instanceof Error) thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(DELETE, async (id: string, thunkAPI) => {
  try {
    const response = await api.deletePost(id);
    return response.data;
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
      .addCase(createPost.fulfilled, (state, action) => [...state, action.payload!])
      .addCase(updatePost.fulfilled, (state, action) =>
        state.map((post) => (post._id === action.payload?._id ? action.payload : post))
      )
      .addCase(deletePost.fulfilled, (state, action) =>
        state.filter((post) => post._id !== action.payload!._id)
      );
  },
});

export default postsSlice.reducer;
