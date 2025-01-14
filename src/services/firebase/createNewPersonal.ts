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
import { RegisterService } from '@/types/models/services/CreateNewPersonal';

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
      await usersCompaniesDoc(companyRef.id);
    } else {
      await usersCompaniesDoc(data.companyId);
    }

    async function usersCompaniesDoc(companyId: string) {
      // create usersCompanies Doc
      const usersRef = doc(collection(db, 'usersCompanies'), userData.uid);
      await setDoc(usersRef, {
        companyId: companyId,
        name: data.name,
        surname: data.surname,
        role: data.role,
        email: data.email,
        status: AppUserStatus.active,
        createdAt: serverTimestamp(),
      });
    }

    // update user info
    await updateUserDisplayName(data.name, data.surname);

    auth.signOut();
  } catch (err: any) {
    const errCode = err.code.charAt(0).toUpperCase() + err.code.slice(1);
    console.error(errCode);
  }
};

export default registerWithEmailPass;
