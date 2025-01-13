import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/FirebaseConfig';
import { toast } from 'sonner';
import { useGenerateAccessKeyProps } from '@/types/models/customHooks/useGenerateAccessKeyModels';

function useRegisterGenerateAccessKey() {
  const generateAccessKey: useGenerateAccessKeyProps = async (companyId) => {
    try {
      const key = uuidv4();
      const createdAt = new Date();
      const expiresAt = new Date();
      expiresAt.setHours(createdAt.getHours() + 12);

      const docRef = await addDoc(collection(db, 'registerAccessKeys'), {
        key,
        isValid: true,
        createdAt,
        expiresAt,
        companyId,
      });
      console.log('Document written with id: ' + docRef.id);
      toast.success('Access key successfully created!');
      // setAccessKey(key);
      return key;
    } catch (error) {
      toast.error(
        'Cannot create access key! An unknown error has occurred. Please check your internet connection or reload the page.'
      );
      console.log(error);
      return '';
    }
  };
  return generateAccessKey;
}

export default useRegisterGenerateAccessKey;
