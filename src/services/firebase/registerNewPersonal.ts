import { auth, db } from '@/firebase/FirebaseConfig';
import { AppUserRoles, AppUserStatus } from '@/types/enums/AuthEnums';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { updateUserDisplayName } from './updateUserDisplayName';
import {
  RegisterService,
  RegisterServiceProps,
} from '@/types/models/services/RegisterNewPersonalModels';

const registerWithEmailPass: RegisterService = async (data) => {
  try {
    // create user
    const UserCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.pass
    );
    const userData = UserCredential.user;
    // create company if user is admin
    if (data.role === AppUserRoles.admin) {
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
        status: AppUserStatus.active,
        subscription: 'Basic',
        subscriptionExpiration: null,
      });
      await createUsersCompaniesDoc(userData.uid, companyRef.id, data);
    } else {
      await createUsersCompaniesDoc(userData.uid, data.companyId, data);
    }

    // update user info
    await updateUserDisplayName(data.name, data.surname);
    await auth.signOut();
  } catch (err: any) {
    console.error('Error during registration:', err);
    throw err;
  }
};
const createUsersCompaniesDoc = async (
  userId: string,
  companyId: string,
  data: RegisterServiceProps
) => {
  const usersRef = doc(collection(db, 'usersCompanies'), userId);
  await setDoc(usersRef, {
    companyId,
    name: data.name,
    surname: data.surname,
    role: data.role,
    email: data.email,
    status: AppUserStatus.active,
    createdAt: serverTimestamp(),
  });
};

export default registerWithEmailPass;
