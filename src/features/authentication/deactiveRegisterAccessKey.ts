import { db } from '@/firebase/FirebaseConfig';
import { DeactiveAccessKeyFunc } from '@/types/models/services/RegisterAccessKeysFeaturesModels';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

export const deactiveAccessKey: DeactiveAccessKeyFunc = async (
  accessKey,
  companyId
) => {
  try {
    const docColRef = collection(
      db,
      `companies/${companyId}/registerAccessKeys`
    );
    const q = query(docColRef, where('key', '==', accessKey));
    const querySnapshot = await getDocs(q);
    const docSnap = querySnapshot.docs[0];
    const docRef = doc(db, 'registerAccessKeys', docSnap.id);
    await updateDoc(docRef, { isValid: false });
  } catch (error) {
    console.log(error);
  }
};
