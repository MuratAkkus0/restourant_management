import { configureStore } from '@reduxjs/toolkit';
import appConfigReducer from './slices/appConfigSlice';
import authReducer from './slices/authSlice';
import { apiClient } from './api/apiClient';

// No redux-persist here: the access token must never touch localStorage
// (see authSlice.ts). Session restoration across page reloads goes through
// the httpOnly refresh cookie instead - see App.tsx's bootstrap effect.
const store = configureStore({
  reducer: {
    appConfigSlice: appConfigReducer,
    auth: authReducer,
    [apiClient.reducerPath]: apiClient.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiClient.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
