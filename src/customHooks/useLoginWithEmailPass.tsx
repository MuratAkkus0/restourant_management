import { auth, db } from '@/firebase/useFirebase';
import { setIsLoading } from '@/store/slices/appConfigSlice';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export interface LoginWithEmailPassProps {
  (email: string, pass: string): void;
}
//Login With Email and Password
export const useLoginWithEmailPass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Navigate kullanarak yönlendirme yapacağız

  const loginWithEmailPass: LoginWithEmailPassProps = async (email, pass) => {
    try {
      dispatch(setIsLoading(true));

      // Firebase Authentication Login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        pass
      );
      const userData = userCredential.user;

      // get user info from users collection
      const userDocRef = doc(db, 'usersBusinesses', userData.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userInfo = userDocSnap.data();
        const businessId = userInfo.businessId;

        // get businness info
        const businessDocRef = doc(db, 'companies', businessId);
        const businessDocSnap = await getDoc(businessDocRef);

        if (businessDocSnap.exists()) {
          // const businessData = businessDocSnap.data();

          // redirect user
          if (userInfo.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/personal/dashboard');
          }

          dispatch(setIsLoading(false));
          toast.success(`Login successful! Welcome ${userData.displayName}`);
        } else {
          throw new Error('Business not found');
        }
      } else {
        throw new Error('User not found');
      }
    } catch (err: any) {
      dispatch(setIsLoading(false));
      const errCode = err.code
        ? err.code.charAt(0).toUpperCase() + err.code.slice(1)
        : err.message;
      console.error(errCode);
      toast.error(errCode);
    }
  };

  return loginWithEmailPass;
};
