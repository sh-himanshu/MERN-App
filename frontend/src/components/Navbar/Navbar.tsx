import { AppBar, Typography, Toolbar, Button } from "@mui/material";
import memories from "../../images/memories.png";
import { MuiImage } from "../Custom/Styled";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import UserInfo from "./UserInfo";
import {
  authInitialState,
  signIn,
  signOut,
} from "../../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const location = useLocation();
  const isAuth = auth !== authInitialState;

  useEffect(() => {
    if (isAuth) {
      // redirect to home if user already logged in
      if (location.pathname === "/auth") navigate("/");
      return;
    }

    if ("profile" in localStorage) {
      // Sign in if previous session is saved
      dispatch(signIn(JSON.parse(localStorage.getItem("profile")!)));
      navigate("/");
    } else if (location.pathname !== "/auth") {
      // redirect to auth page
      navigate("/auth");
    }
  }, [dispatch, isAuth, location, navigate]);

  const logout = () => {
    dispatch(signOut());
    navigate("/auth");
  };

  return (
    <AppBar
      color="inherit"
      position="static"
      sx={{
        borderRadius: 5,
        p: 2,
        margin: "30px 0",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          component={Link}
          to="/"
          variant="h3"
          align="center"
          sx={{ color: "rgba(0, 183, 255, 1)", textDecoration: "none" }}
        >
          Memories
        </Typography>
        <MuiImage src={memories} alt="icon" height="60" sx={{ ml: "15px" }} />
      </div>
      <Toolbar>
        {isAuth ? (
          <>
            <UserInfo name={auth.user.name} imageUrl={auth.user.imageUrl} />
            <Button
              variant="contained"
              startIcon={<LogoutRoundedIcon />}
              onClick={logout}
            >
              Log Out
            </Button>
          </>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            startIcon={<LoginRoundedIcon />}
          >
            Log In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
