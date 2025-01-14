import { db } from '@/firebase/FirebaseConfig';
import { ValidateAccessKeyFunc } from '@/types/models/services/RegisterAccessKeysFeaturesModels';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const validateAccessKey: ValidateAccessKeyFunc = async ({
  accessKey,
  companyId,
}) => {
  console.log('valideting key..');
  const accessKeysRef = collection(
    db,
    `companies/${companyId}/registerationLinks`
  );
  // prepare query
  const q = query(accessKeysRef, where('key', '==', accessKey));
  // start query
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // get doc
    const docSnap = querySnapshot.docs[0];
    // get docs data
    const data = docSnap.data();
    if (!data.isValid) {
      throw new Error(
        'This register link is not valid. Please request another link by admin.'
      );
    }

    if (new Date() > data.expiresAt.toDate()) {
      throw new Error(
        'This access key is not more valid! Please request another access key by admin.'
      );
    }

    return;
  } else {
    throw new Error('This access key does not exist!');
  }
};
