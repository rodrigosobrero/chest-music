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
      if (Array.isArray(state.playlist) && state.playlist.length > 0) {
        console.log(state.playlist[0].isPlaying)
        // Asumiendo que cada elemento en `playlist` tiene un campo `isPlaying`
        state.playlist[0].isPlaying = !state.playlist[0].isPlaying; // o usa `action.payload.isPlaying` si es necesario
      } else {
        console.log("state.playlist no es un arreglo o está vacío");
      }
    
    },
    reset: (state) => (state.playlist = []),
  }
});

export const { add, remove, playing, reset, play } = playlist.actions;

export default playlist.reducer;