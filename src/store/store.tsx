import { configureStore } from '@reduxjs/toolkit';
import authProcessReducer from './slices/authProcesses';
import registerAccessReducer from './slices/registerAccess';
import appConfigReducer from './slices/appConfig';

const store = configureStore({
  reducer: {
    appConfig: appConfigReducer,
    authProcess: authProcessReducer,
    registerAccess: registerAccessReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
