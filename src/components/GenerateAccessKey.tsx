import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/useFirebase';
import { useState } from 'react';
import { toast } from 'sonner';

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
    <div className="w-full h-full">
      <input
        value={accessKey}
        onChange={(e) => setAccessKey(e.target.value)}
        className="border outline-none"
        type="text"
        placeholder="Access Token..."
      />
      <button
        onClick={generateAccessKey}
        className="w-36 h-8 border-none rounded-lg shadow-sm cursor-pointer bg-gray-300"
      >
        Generate Access Key
      </button>
    </div>
  );
}

export default GenerateAccessKey;
