import { configureStore } from '@reduxjs/toolkit';
import globalUiReducer from '../features/ui/globalUiSlice';
import authReducer from '../features/auth/authSlice';
import { hallifyApi } from '../features/api/hallifyApi';

export const store = configureStore({
  reducer: {
    [hallifyApi.reducerPath]: hallifyApi.reducer,
    auth: authReducer,
    ui: globalUiReducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(hallifyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
