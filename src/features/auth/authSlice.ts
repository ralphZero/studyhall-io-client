import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import {
  SetCredentialsPayloadAction,
  AuthSliceState,
  SetAuthReady,
} from './interfaces';

const initialState: AuthSliceState = {
  user: null,
  token: null,
  isReady: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthReady: (
      state: AuthSliceState,
      action: PayloadAction<SetAuthReady>
    ) => {
      state.isReady = action.payload.isReady;
    },
    setCredentials: (
      state: AuthSliceState,
      action: PayloadAction<SetCredentialsPayloadAction>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { setCredentials, setAuthReady } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
