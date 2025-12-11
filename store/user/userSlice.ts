import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, signupUser, fetchCurrentUser } from './userAction';

interface UserState {
  isAuthenticated: boolean;
  name: string;
  email: string;
  loading: boolean;
}

const initialState: UserState = {
  isAuthenticated: false,
  name: '',
  email: '',
  loading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; email: string }>
    ) => {
      state.isAuthenticated = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.loading = false;
    },

    clearUser: (state) => {
      state.isAuthenticated = false;
      state.name = '';
      state.email = '';
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    // ⭐ Signup
    builder
      .addCase(signupUser.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.loading = false;
      });

    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.loading = false;
      });

    builder
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.loading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
