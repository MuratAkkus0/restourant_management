import { auth, db } from '@/firebase/FirebaseConfig';
import { setIsAppLoading } from '@/store/slices/appConfigSlice';
import { AppUserRoles } from '@/types/enums/AuthEnums';
import { LoginWithEmailPassProps } from '@/types/models/services/AuthModels';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

//Login With Email and Password
export const useLoginWithEmailPass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginWithEmailPass: LoginWithEmailPassProps = async (email, pass) => {
    try {
      dispatch(setIsAppLoading(true));

      // Firebase Authentication Login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        pass
      );
      const userData = userCredential.user;

      // get user info from users collection
      const userDocRef = doc(db, 'usersCompanies', userData.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userInfo = userDocSnap.data();
        const companyId = userInfo.companyId;

        // get businness info
        const companyDocRef = doc(db, 'companies', companyId);
        const companyDocSnap = await getDoc(companyDocRef);

        if (companyDocSnap.exists()) {
          // const companyData = companyDocSnap.data();

          // redirect user
          if (userInfo.role === AppUserRoles.ADMIN) {
            navigate('/admin');
            console.log('aktive');
          } else {
            navigate('/personal/dashboard');
          }
          console.log(userData);
          dispatch(setIsAppLoading(false));
          toast.success(`Login successful! Welcome ${userData.displayName}`);
        } else {
          throw new Error('company not found');
        }
      } else {
        throw new Error('User not found');
      }
    } catch (err: any) {
      dispatch(setIsAppLoading(false));
      const errCode = err.code
        ? err.code.charAt(0).toUpperCase() + err.code.slice(1)
        : err.message;
      console.error(errCode);
      toast.error(errCode);
    }
  };

  return loginWithEmailPass;
};
