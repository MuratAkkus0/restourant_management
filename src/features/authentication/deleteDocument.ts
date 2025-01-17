import { db } from '@/firebase/FirebaseConfig';
import { deleteDoc, doc } from 'firebase/firestore';

export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    // get doc ref
    const docRef = doc(db, collectionName, docId);
    // del doc
    await deleteDoc(docRef);
    console.log(`Document deleted successfuly: ${docId}`);
  } catch (error) {
    console.error('An error occured during document deleting proccess:', error);
  }
};
