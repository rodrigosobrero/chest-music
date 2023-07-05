import { configureStore } from '@reduxjs/toolkit';
import playlistReducer from 'app/playlist';

export default configureStore({
  reducer: {
    playlist: playlistReducer
  },
});