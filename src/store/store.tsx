import { configureStore } from '@reduxjs/toolkit';
import registerAccessReducer from './slices/registerAccess';
import appConfigReducer from './slices/appConfigSlice';
import onAuthChangeStateReducer from './slices/onAuthChangeState';

const store = configureStore({
  reducer: {
    appConfigSlice: appConfigReducer,
    onAuthChangeState: onAuthChangeStateReducer,
    registerAccess: registerAccessReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
