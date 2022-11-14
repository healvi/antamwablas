import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface AuthState {
  token: string;
  isAuth: boolean;
}

const initialState: AuthState = {
  token: "",
  isAuth: false,
};

export const Auths = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    clear: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setAuth, clear } = Auths.actions;
export const auths = (state: RootState) => state.Auth.token;
export default Auths.reducer;
