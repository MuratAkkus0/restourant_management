import { auth, db } from '@/firebase/FirebaseConfig';
import { setIsLoading } from '@/store/slices/onAuthChangeState';
import { AppUserRoles } from '@/types/enums/AuthEnums';
import { RegisterWithEmailPassProps } from '@/types/models/services/AuthModels';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useRegisterWithEmailPass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerWithEmailPass: RegisterWithEmailPassProps = async (data) => {
    try {
      dispatch(setIsLoading(true));

      // Create User
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.pass
      );
      const userData = userCredential.user;

      // Create Company Doc
      const companyRef = await addDoc(collection(db, 'companies'), {
        name: data.companyName,
        ownerId: userData.uid,
        country: data.country,
        state: data.state,
        city: data.city,
        street: data.street,
        houseNo: data.houseNo,
        postalCode: data.postalCode,
        createdAt: serverTimestamp(),
        status: 'active',
        subscription: 'Basic',
        subscriptionExpiration: null,
      });

      // create admin record in users collection
      const usersRef = doc(collection(db, 'usersCompanies'), userData.uid);
      await setDoc(usersRef, {
        companyId: companyRef.id,
        name: data.name,
        surname: data.surname,
        role: AppUserRoles.admin,
        email: userData.email,
        status: 'active',
        createdAt: serverTimestamp(),
      });

      // update user infos
      await updateUserInfos(data.name, data.surname);

      dispatch(setIsLoading(false));
      toast.success(`Register successful! Please login with your new account.`);
      // i used it instead of custom logout hook because i dont wanna show any notifications .
      auth.signOut();
      navigate('/login');
    } catch (err: any) {
      dispatch(setIsLoading(false));
      const errCode = err.code.charAt(0).toUpperCase() + err.code.slice(1);
      console.error(errCode);
      toast.error(errCode);
    }
  };

  const updateUserInfos = async (firstName: string, lastName: string) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
      });
    }
  };
  return registerWithEmailPass;
};
