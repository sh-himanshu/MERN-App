import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { signIn } from "../../features/auth/authSlice";
import { useNavigate } from "react-router";

const GoogleLoginButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSuccess = async (
    e: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if (!("googleId" in e)) return console.error(e);

    const { googleId, imageUrl, email, name } = e.profileObj;

    dispatch(
      signIn({
        user: {
          googleId,
          imageUrl,
          email,
          name,
        },
        tokenId: e.tokenId,
      })
    );
    navigate("/");
  };

  return (
    <GoogleLogin
      clientId="205417913683-4jn5oe8i4cggh1skv2m0dmct2s7ligm9.apps.googleusercontent.com"
      render={({ onClick, disabled }) => (
        <Button
          color="primary"
          onClick={onClick}
          disabled={disabled}
          variant="contained"
          fullWidth
          sx={{ my: 1 }}
          startIcon={<GoogleIcon />}
        >
          Sign in with Google
        </Button>
      )}
      onSuccess={handleSuccess}
      onFailure={(e) => console.error(e)}
      cookiePolicy="single_host_origin"
    />
  );
};

export default GoogleLoginButton;
