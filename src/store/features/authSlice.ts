import { fetchSignup, fetchTokens, fetchUser, refreshToken } from "@/api/user";
import { SigninFormType, SignupFormType, userType } from "@/components/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ email, password }: SigninFormType) => {
    const user = await fetchUser({ email, password });
    return user;
  }
);

export const getTokens = createAsyncThunk(
  "user/getTokens",
  async ({ email, password }: SigninFormType) => {
    const tokens = await fetchTokens({ email, password });
    console.log(tokens)
    return tokens;
  }
);

export const getSignup = createAsyncThunk(
  "user/getSignup",
  async ({ email, password, username }: SignupFormType) => {
    const user = await fetchSignup({ email, password, username });
    return user;
  }
);

export const getNewAccessToken = createAsyncThunk(
  "user/getNewAccessToken",
  async ( refresh: string) => {
      const token = await refreshToken( refresh )
      return token
  }
)

type AuthStateType = {
  user: null | userType;
  tokens: {
    access: null | string;
    refresh: null | string;
  };
};

const initialState: AuthStateType = {
  user: null,
  tokens: {
    access: null,
    refresh: null,
  },
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.tokens.access = null;
      state.tokens.refresh = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUser.fulfilled, (state, action: PayloadAction<userType>) => {
        state.user = action.payload;
      })
      .addCase(
        getTokens.fulfilled,
        (
          state,
          action: PayloadAction<{
            access: null | string;
            refresh: null | string;
          }>
        ) => {
          state.tokens.access = action.payload.access;
          state.tokens.refresh = action.payload.refresh;
        }
      ).addCase(getSignup.fulfilled, (state, action: PayloadAction<userType>) => {
        state.user = action.payload;
    }).addCase(getNewAccessToken.fulfilled, (state, action: PayloadAction<string>) => {
        state.tokens.access = action.payload;
    })
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;