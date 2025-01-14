import { useEffect } from 'react';
import RouterView from './config/Router/RouterView.tsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase/FirebaseConfig.tsx';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setAuthState } from './store/slices/onAuthChangeState.tsx';
import { setIsLoading } from './store/slices/onAuthChangeState.tsx';
import { RootState } from './store/store.tsx';
import Loading from './components/atoms/Loading.tsx';

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (store: RootState) => store.appConfigSlice.isLoading
  );

  useEffect(() => {
    dispatch(setIsLoading(true));
    const checkAuth = onAuthStateChanged(auth, async (currentUser) => {
      console.log(currentUser);
      if (currentUser) {
        const usersRef = doc(db, 'usersCompanies', currentUser.uid);
        const userDocSnap = await getDoc(usersRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          dispatch(
            setAuthState({
              user: {
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
              },
              role: userData.role,
              companyId: userData.companyId,
              loading: false,
            })
          );
          dispatch(setIsLoading(false));
        } else {
          dispatch(setIsLoading(false));
          dispatch(logout());
        }
      } else {
        dispatch(setIsLoading(false));
        dispatch(logout());
      }
    });

    return () => checkAuth();
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loading />}
      <RouterView />
    </>
  );
}

export default App;
