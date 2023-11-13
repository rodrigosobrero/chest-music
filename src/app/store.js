import { configureStore } from '@reduxjs/toolkit';
import playlistReducer from 'app/playlist';
import authReducer from 'app/auth';
import fileReducer from 'app/upload';

export default configureStore({
  reducer: {
    playlist: playlistReducer,
    auth: authReducer,
    upload: fileReducer
  },
});