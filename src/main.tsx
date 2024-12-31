import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.tsx';
import { Toaster } from 'sonner';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <Toaster position="top-right" richColors />
        <App />
      </Provider>
    </BrowserRouter>
  </>
);
