import { useEffect } from 'react';
import RouterView from './config/Router/RouterView.tsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase/FirebaseConfig.tsx';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { logout, setAuthState } from './store/slices/onAuthChangeState.tsx';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = onAuthStateChanged(auth, async (currentUser) => {
      console.log(currentUser);
      if (currentUser) {
        const usersRef = doc(db, 'usersCompanies', currentUser.uid);
        const userDocSnap = await getDoc(usersRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          console.log(userData);
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
        } else {
          dispatch(logout());
        }
      } else {
        dispatch(logout());
      }
    });

    return () => checkAuth();
  }, [dispatch]);

  return (
    <>
      <RouterView />
    </>
  );
}

export default App;
