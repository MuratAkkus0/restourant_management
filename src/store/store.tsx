import { configureStore } from '@reduxjs/toolkit';
import authProcessReducer from './slices/authProcesses';
import registerAccessReducer from './slices/registerAccess';
import appConfigReducer from './slices/appConfigSlice';

const store = configureStore({
  reducer: {
    appConfigSlice: appConfigReducer,
    authProcess: authProcessReducer,
    registerAccess: registerAccessReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
