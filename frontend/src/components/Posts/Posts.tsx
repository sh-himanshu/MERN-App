import { Box, CircularProgress, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import Post from "./Post/Post";
import { fetchPosts } from "../../features/posts/postsSlice";

interface Props {
  currentId: string;
  setCurrentId: React.Dispatch<React.SetStateAction<string>>;
}

export default function Posts({ currentId, setCurrentId }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const posts = useAppSelector((state) => state.posts);

  return !posts.length ? (
    <Box
      sx={{
        display: "flex",
        mt: 5,
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Grid
      container
      flexDirection={{
        xs: "column",
        sm: "row",
      }}
      rowSpacing={{
        xs: 3,
        sm: 3,
        md: 2,
      }}
      columnSpacing={{
        xs: 0,
        sm: 3,
        md: 2,
        lg: 4,
      }}
      alignItems={{
        xs: "center",
        sm: "stretch",
      }}
    >
      {posts.map((post) => (
        <Grid item xs={12} sm={6} key={post._id}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
}
