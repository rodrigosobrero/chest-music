import { createSlice } from '@reduxjs/toolkit';
import { api } from 'store/api';

const initialState = {
  data: {},
  email: '',
  token: '',
  signInMethod: '',
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    updateUserToken: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          token: action.payload
        }
      }
    },
    updateUserData: (state, action) => {
      state.user.data = {...state.user.data, ...action.payload}
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.createAccount.matchFulfilled, (state, { payload }) => {
        state.auth.user.data = payload;
      })
  }
});

export const { saveUser, updateUserToken, updateUserData } = authSlice.actions;
export default authSlice.reducer;