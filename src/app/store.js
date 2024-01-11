import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { persistReducer } from 'redux-persist';
import { api } from 'store/api';
import storage from 'redux-persist/lib/storage';

import playlistReducer from 'app/playlist';
import authReducer from 'app/auth';
import fileReducer from 'app/upload';
import { modalReducer } from './modals';

const reducers = combineReducers({
  playlist: playlistReducer,
  auth: authReducer,
  upload: fileReducer,
  modal: modalReducer,
  [api.reducerPath]: api.reducer
})

const persistConfig = {
  blacklist: ['modal', 'playlist'],
  key: 'rootgs',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(api.middleware),
});

setupListeners(store.dispatch);