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
    console.log('deactive');
    const docColRef = collection(
      db,
      `companies/${companyId}/registerationLinks`
    );
    const q = query(docColRef, where('key', '==', accessKey));
    const querySnapshot = await getDocs(q);
    const docSnap = querySnapshot.docs[0];
    if (docSnap.exists()) {
      const docRef = doc(
        db,
        `companies/${companyId}/registerationLinks`,
        docSnap.id
      );
      await updateDoc(docRef, { isValid: false });
    } else {
      throw new Error("Access key doesn't exists.");
    }
  } catch (error) {
    console.error(error);
  }
};
