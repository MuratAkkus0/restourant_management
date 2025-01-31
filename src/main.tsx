import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store, { persistor } from './store/store.tsx';
import { Toaster } from 'sonner';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Toaster position="top-right" richColors />
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </>
);
