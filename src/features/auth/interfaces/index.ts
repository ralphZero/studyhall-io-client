export interface User {
  displayName: string;
  email: string;
  photoUrl: string;
  uid: string;
}

export interface AuthSliceState {
  user: User | null;
  token: string | null;
  isReady: boolean;
}

export interface SetCredentialsPayloadAction {
  user: User | null;
  token: string | null;
}

export interface SetAuthReady {
  isReady: boolean;
}
