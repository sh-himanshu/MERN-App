import {
  Container,
  Fab,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleLoginButton from "./GoogleLoginButton";

const Auth = () => {
  return (
    <Container maxWidth="xs">
      <Paper
        sx={{
          mt: 7,
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Fab
          size="small"
          color="secondary"
          aria-label="sign in"
          sx={{
            boxShadow: "none",
          }}
        >
          <LockOutlinedIcon />
        </Fab>
        <Typography variant="h5" sx={{ mt: 0.5, mb: 2 }}>
          Sign In
        </Typography>
        <TextField required label="Email" sx={{ mt: 1.5 }} fullWidth />
        <TextField
          required
          label="Password"
          type="password"
          autoComplete="current-password"
          sx={{ my: 1.5 }}
          fullWidth
        />
        <Button variant="contained" fullWidth sx={{ my: 1 }}>
          Sign in
        </Button>

        <GoogleLoginButton />

        <Grid
          container
          sx={{
            justifyContent: "flex-end",
            my: 1,
          }}
        >
          <Grid item>
            <Typography
              variant="overline"
              sx={{
                mr: 1,
              }}
            >
              Don't have an account?
            </Typography>
            <Button>Sign Up</Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Auth;
