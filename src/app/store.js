import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { api } from 'store/api';

import playlistReducer from 'app/playlist';
import authReducer from 'app/auth';
import fileReducer from 'app/upload';

export const store = configureStore({
  reducer: {
    playlist: playlistReducer,
    auth: authReducer,
    upload: fileReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);