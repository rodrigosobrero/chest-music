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
      state.playlist[0] = action.payload
    },
    play: (state, action) => {
      if (state.playlist.length > 0) {
        state.playlist[0].isPlaying = !state.playlist[0].isPlaying;
      } 
    },
    reset: (state) => { 
      state.playlist = [] 
    },
  }
});

export const { add, remove, playing, reset, play } = playlist.actions;

export default playlist.reducer;