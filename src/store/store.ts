import { configureStore } from '@reduxjs/toolkit';
import globalUiReducer from '../features/ui/globalUiSlice';
import { hallifyApi } from '../features/api/hallifyApi';

export const store = configureStore({
  reducer: {
    [hallifyApi.reducerPath]: hallifyApi.reducer,
    globalUiReducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(hallifyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
