import { configureStore } from '@reduxjs/toolkit';
import inspectionReducer from './slices/inspectionSlice';

const store = configureStore({
  reducer: {
    inspection: inspectionReducer,
    // Agrega más reductores aquí si es necesario
  },
});

export default store;