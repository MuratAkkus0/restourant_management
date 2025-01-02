import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/useFirebase';
import { useState } from 'react';
import { toast } from 'sonner';
import AccessKeyCard from './AccessKeyCard';

function GenerateAccessKey() {
  const [accessKey, setAccessKey] = useState('');

  async function generateAccessKey(): Promise<void> {
    try {
      const key = uuidv4();
      const createdAt = new Date();
      const expiresAt = new Date();
      expiresAt.setHours(createdAt.getHours() + 12);

      const docRef = await addDoc(collection(db, 'accessKeys'), {
        key,
        isValid: true,
        createdAt,
        expiresAt,
      });
      console.log('Document written with id: ' + docRef.id);
      toast.success('Access key successfully created!');
      setAccessKey(key);
      return;
    } catch (error) {
      toast.success(
        'Cannot create access key! An unknown error has occurred. Please check your internet connection or reload the page.'
      );
      console.log(error);
      return;
    }
  }
  return (
    <>
      <AccessKeyCard
        inputVal={accessKey}
        isInputReadOnly={true}
        btnOnClick={generateAccessKey}
        btnText="Generate Access Key"
        cardTitle="Generate New Access Key"
        descText="Click on the Generate button below for create new access key."
      />
    </>
  );
}

export default GenerateAccessKey;
