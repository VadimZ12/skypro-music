import { fetchAuthorization, fetchTokens, fetchUser } from "@/api/user";
import { SigninFormType, StaredUserType } from "@/types/types";
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
    return tokens;
  }
);

export const getAuth = createAsyncThunk(
  "user/getAuth",
  async ({ email, password }: SigninFormType) => {
    const authorization = await fetchAuthorization({ email, password});
    return authorization;
  }
);

type AuthStateType = {
  user: null | StaredUserType;
  tokens: {
    access: string | null;
    refresh: string | null;
  };
};
const initialState: AuthStateType = {
  user: null,
  tokens: {
    access: null,
    refresh: null,
  },
};

const AuthSlice = createSlice({
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
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<StaredUserType>) => {
          state.user = action.payload;
        }
      )
      .addCase(
        getTokens.fulfilled,
        (
          state,
          action: PayloadAction<{
            access: string | null;
            refresh: string | null;
          }>
        ) => {
          state.tokens.access = action.payload.access;
          state.tokens.refresh = action.payload.refresh;
        }
      )
      .addCase(
        getAuth.fulfilled,
        (state, action: PayloadAction<StaredUserType>) => {
          state.user = action.payload;
        }
      )
      .addCase(getUser.rejected, (state, action) => {
        console.error("Error:", action.error.message); // Выводим сообщение об ошибке в консоль
      });
  },
});

export const { logout } = AuthSlice.actions;
export const authReduser = AuthSlice.reducer;