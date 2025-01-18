import { db } from '@/firebase/FirebaseConfig';
import { FetchDocumentsProps } from '@/types/models/services/fetchDocumentsModels';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';

export const fetchDocuments: FetchDocumentsProps = async (
  collectionPath,
  callback,
  options
) => {
  const colRef = collection(db, ...collectionPath);

  if (options?.realTime) {
    return new Promise((resolve, reject) => {
      const unsubscribe = onSnapshot(
        colRef,
        (snapshot) => {
          const documents = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          callback?.(documents);
          resolve(unsubscribe);
        },
        (error) => reject(error)
      );
    });
  }

  // if not realTime
  const snapshot = await getDocs(colRef);
  const documents = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return documents;
};
