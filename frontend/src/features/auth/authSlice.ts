import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TAuth {
  user: {
    googleId: string;
    imageUrl: string;
    email: string;
    name: string;
  };
  tokenId: string;
}

export const authInitialState: TAuth = {
  user: {
    googleId: "",
    imageUrl: "",
    email: "",
    name: "",
  },
  tokenId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    signIn: (_state, action: PayloadAction<TAuth>) => {
      const { payload: auth } = action;
      localStorage.setItem("profile", JSON.stringify(auth));
      return auth;
    },
    signOut: () => {
      localStorage.clear();
      return authInitialState;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
