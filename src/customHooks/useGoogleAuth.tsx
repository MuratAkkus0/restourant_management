import { auth, db } from '@/firebase/useFirebase';
import { setIsLoading } from '@/store/slices/appConfigSlice';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export interface registerData {
  name: string;
  surname: string;
  email: string;
  pass: string;
  passConfirm: string;
  street: string;
  houseNo: string;
  state: string;
  postalCode: string;
  city: string;
  country: string;
  businessName: string;
}

export interface RegisterWithEmailPassProps {
  (data: registerData): void;
}

export interface LoginWithEmailPassProps {
  (email: string, pass: string): void;
}
// Register With Email and Password
export const useRegisterWithEmailPass = () => {
  const dispatch = useDispatch();
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
        name: data.businessName,
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

      // save admin in business/admins
      const adminRef = doc(
        collection(db, 'companies', companyRef.id, 'admins'),
        userData.uid
      );
      await setDoc(adminRef, {
        name: data.name,
        surname: data.surname,
        email: userData.email,
        role: 'admin',
        status: 'active',
        createdAt: serverTimestamp(),
      });

      // create admin record in users collection
      const usersRef = doc(collection(db, 'usersCompanies'), userData.uid);
      await setDoc(usersRef, {
        businessId: companyRef.id,
        role: 'admin',
        createdAt: serverTimestamp(),
      });

      // update user infos
      await updateUserInfos(data.name, data.surname);

      dispatch(setIsLoading(false));
      toast.success(
        `Register successful. Welcome ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}`
      );
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

//Logout
export const useLogout = () => {
  const logout = () => {
    auth
      .signOut()
      .then(() => toast.success('Logout successfull !'))
      .catch((err) => toast.error(err.code));
  };
  return logout;
};
