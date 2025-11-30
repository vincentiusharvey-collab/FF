import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import petsReducer from './slices/petsSlice';
import appointmentsReducer from './slices/appointmentsSlice';
import { api } from '../services/api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pets: petsReducer,
    appointments: appointmentsReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
