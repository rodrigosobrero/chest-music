import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export const { saveUser, updateUser } = authSlice.actions;
export default authSlice.reducer;