import { createSlice } from '@reduxjs/toolkit';

export const playlist = createSlice({
  name: 'playlist',
  initialState: {
    playlist: []
  },
  reducers: {
    add: (state, action) => {
      state.playlist.push(action.payload);
    },
    remove: (state, action) => {
      state.playlist.splice(state.playlist.findIndex(track => track.name === action.payload), 1);
    },
    playing: (state, action) => {
      return [action.payload];
    },
    clear: (state) => {
      state.playlist = []
    }
    
  }
});

export const { add, remove, playing, clear } = playlist.actions;

export default playlist.reducer;