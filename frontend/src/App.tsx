import { AppBar, Container, Grid, Grow, Typography } from "@mui/material";

import Form from "./components/Form";
import { MuiImage } from "./components/custom";
import Posts from "./components/Posts";
import memories from "./images/memories.png";

const App = () => {
  return (
    <Container maxWidth="lg">
      <AppBar
        color="inherit"
        position="static"
        sx={{
          borderRadius: 15,
          margin: "30px 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" align="center" sx={{ color: "rgba(0, 183, 255, 1)" }}>
          Memories
        </Typography>
        <MuiImage src={memories} alt="icon" height="60" sx={{ marginLeft: "15px" }} />
      </AppBar>

      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
