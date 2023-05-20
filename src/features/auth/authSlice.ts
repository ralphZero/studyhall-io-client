import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { RootState } from '../../store/store';

interface AuthSliceState {
  user: User | null;
  token: string | null;
}

interface AuthSlicePayloadAction {
  user: User;
  token: string;
}

const initialState: AuthSliceState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state: AuthSliceState,
      action: PayloadAction<AuthSlicePayloadAction>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
