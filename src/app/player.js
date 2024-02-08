import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    opened: false
  },
  reducers: {
    openPlayer: (state) => {
      state.opened = true;
    },
    closePlayer: (state) => {
      state.opened = false;
    }
  }
});

export const { openPlayer, closePlayer } = playerSlice.actions;
export default playerSlice.reducer;