import { configureStore } from '@reduxjs/toolkit';
import registerAccessReducer from './slices/registerAccess';
import appConfigReducer from './slices/appConfigSlice';
import onAuthChangeStateReducer from './slices/onAuthChangeState';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { toast } from 'sonner';

const persistConfig = {
  key: 'root',
  version: 1,
  debug: true,
  writeFailHandler: (e: Error) => {
    console.error('Persisting data process failed : ', e);
    toast.error('An unknown error occured during saving data process !');
  },
  storage,
  whiteList: ['onAuthChangeState'],
};

const persistedReducer = persistReducer(
  persistConfig,
  onAuthChangeStateReducer
);

const store = configureStore({
  reducer: {
    appConfigSlice: appConfigReducer,
    onAuthChangeState: persistedReducer,
    registerAccess: registerAccessReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
