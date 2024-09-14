// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import inspectionReducer from './slices/inspectionSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'user',
  storage, // Usa localStorage por defecto
};

// Aplica el persistReducer solo al slice de usuario
const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer, // Persiste el slice de usuario
    inspection: inspectionReducer, // Slice normal para otras cosas
  },
});

export const persistor = persistStore(store);
