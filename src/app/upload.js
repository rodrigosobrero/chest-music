import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const uploadSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    addFile: (state, action) => {
      state.file = action.payload;
    },
    removeFile: (state) => {
      state.file = {};
    }
  },
});

export const { addFile, removeFile } = uploadSlice.actions;
export default uploadSlice.reducer;