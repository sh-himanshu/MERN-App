import { Container, Grid, Grow } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { fetchPosts } from "../../features/posts/postsSlice";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";

const Home = () => {
  const [currentId, setCurrentId] = useState("0");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, currentId]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent={{
            xs: "center",
            md: "space-between",
          }}
          alignItems={{
            xs: "center",
            md: "stretch",
          }}
          flexDirection={{
            xs: "column-reverse",
            md: "row",
          }}
          pb="30px"
          columnSpacing={2}
        >
          <Grid item sm={12} md={8} lg={7}>
            <Posts currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          <Grid item sm={12} md={4} lg={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
