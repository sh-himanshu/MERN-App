import { AppBar, Container, Grid, Grow, Typography } from "@mui/material";

import Form from "./components/Form/Form";
import { MuiImage } from "./components/custom/Styled";
import Posts from "./components/Posts/Posts";
import memories from "./images/memories.png";
import { useState } from "react";

const App = () => {
  const [currentId, setCurrentId] = useState("0");

  return (
    <Container maxWidth="lg">
      <AppBar
        color="inherit"
        position="static"
        sx={{
          borderRadius: 5,
          padding: 1,
          margin: "30px 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" align="center" sx={{ color: "rgba(0, 183, 255, 1)" }}>
          Memories
        </Typography>
        <MuiImage src={memories} alt="icon" height="60" sx={{ marginLeft: "15px" }} />
      </AppBar>

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
    </Container>
  );
};

export default App;
