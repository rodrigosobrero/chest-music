import { createSlice } from '@reduxjs/toolkit';
import { api } from 'store/api';

const initialState = {};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      state.user = {...state.user, ...action.payload};
    },
    updateUserData: (state, action) => {
      state.user.data = {...state.user?.data, ...action.payload}
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.createAccount.matchFulfilled, (state, { payload }) => {
        state.auth.user.data = payload;
      })
  }
});

export const { saveUser, updateUser, updateUserData } = authSlice.actions;
export default authSlice.reducer;