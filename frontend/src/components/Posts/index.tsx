import { Box, CircularProgress, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import Post from "./Post";
import { fetchPosts } from "../../features/posts/postsSlice";

export default function Posts() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const posts = useAppSelector((state) => state.posts);

  return !posts.length ? (
    <Box
      sx={{
        display: "flex",
        marginTop: (theme) => theme.spacing(5),
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="stretch"
      rowSpacing={2}
      columnSpacing={2}
    >
      {posts.map((post) => (
        <Grid item xs={12} sm={6} key={post._id}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
}
