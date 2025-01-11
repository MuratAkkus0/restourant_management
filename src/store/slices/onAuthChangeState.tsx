import { AppUserRoles } from '@/types/enums/AuthEnums';
import { AuthState } from '@/types/models/services/AuthModels';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
  user: {
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
  },
  role: AppUserRoles.unknown,
  companyId: null,
  loading: true,
};

const onAuthChangeState = createSlice({
  name: 'onAuthChangeState',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setAuthState(state, action: PayloadAction<AuthState>) {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.companyId = action.payload.companyId;
      state.loading = action.payload.loading;
    },
    logout(state) {
      state.user = {
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
      };
      state.role = AppUserRoles.unknown;
      state.companyId = null;
      state.loading = false;
    },
  },
});

export const { logout, setAuthState, setIsLoading } = onAuthChangeState.actions;
export default onAuthChangeState.reducer;
