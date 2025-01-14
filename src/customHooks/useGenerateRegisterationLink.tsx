import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/FirebaseConfig';
import { toast } from 'sonner';
import { GenerateRegisterationLinkProps } from '@/types/models/customHooks/GenerateRegisterationLink';

function useGenerateRegisterationLink() {
  const generateRegisterationLink: GenerateRegisterationLinkProps = async (
    companyId
  ) => {
    try {
      const key = uuidv4();
      const createdAt = new Date();
      const expiresAt = new Date();
      expiresAt.setHours(createdAt.getHours() + 12);
      const paramObj = { key: key, cId: companyId };
      const params = new URLSearchParams(paramObj);
      const link = `${window.location.origin}/personal-register?${params.toString()}`;
      const docRef = await addDoc(
        collection(db, `companies/${companyId}/registerationLinks`),
        {
          key,
          link,
          isValid: true,
          createdAt,
          expiresAt,
          companyId,
        }
      );
      console.log('Document written with id: ' + docRef.id);
      toast.success('Access key successfully created!');
      return link;
    } catch (error) {
      toast.error(
        'Cannot create access key! An unknown error has occurred. Please check your internet connection or reload the page.'
      );
      console.log(error);
      return '';
    }
  };
  return generateRegisterationLink;
}

export default useGenerateRegisterationLink;
