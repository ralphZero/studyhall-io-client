import { configureStore } from '@reduxjs/toolkit';
import globalUiReducer from '../features/ui/globalUiSlice';

export const store = configureStore({
  reducer: {
    globalUiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
