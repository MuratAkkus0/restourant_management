import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import RouterView from './config/Router/RouterView.tsx';
import Loading from './components/atoms/Loading.tsx';
import { RootState } from './store/store.tsx';
import { useBootstrapSessionMutation } from './store/api/authApi.ts';

function App() {
  const status = useSelector((store: RootState) => store.auth.status);
  const [bootstrapSession] = useBootstrapSessionMutation();

  // Restores the session on every fresh page load using the httpOnly
  // refresh cookie - there is nothing sensitive to read from localStorage,
  // by design (see authSlice.ts).
  useEffect(() => {
    bootstrapSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {status === 'checking' && <Loading />}
      <RouterView />
    </>
  );
}

export default App;
