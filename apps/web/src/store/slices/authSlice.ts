import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthResponse, AuthUser } from '@manegio/shared';

export type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  status: AuthStatus;
};

// The access token is intentionally NOT persisted (no localStorage/redux-persist)
// - it only ever lives in memory. Sessions survive a page reload via the
// httpOnly refresh cookie instead (see App.tsx's bootstrap call to /api/auth/refresh
// and apiClient.ts's automatic-reauth logic), which is the whole point of
// keeping the refresh token out of reach of any client-side script.
const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: 'checking',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    credentialsSet(state, action: PayloadAction<AuthResponse>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.status = 'authenticated';
    },
    loggedOut(state) {
      state.user = null;
      state.accessToken = null;
      state.status = 'unauthenticated';
    },
  },
});

export const { credentialsSet, loggedOut } = authSlice.actions;
export default authSlice.reducer;
