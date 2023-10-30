import { configureStore } from '@reduxjs/toolkit';
import playlistReducer from 'app/playlist';
import authReducer from 'app/auth';

export default configureStore({
  reducer: {
    playlist: playlistReducer,
    auth: authReducer
  },
});