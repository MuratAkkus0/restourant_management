import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase/useFirebase';
import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAccess } from '../store/slices/registerAccess';
import Logo from './Logo';
import { FontSizes, LogoSizes } from '../types/models/LogoModels';
import AccessKeyCard from './AccessKeyCard';
function ConfirmAccess() {
  const [inputVal, setInputVal] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const verifyAccessKey = async () => {
    try {
      //get collection
      const accessKeyRef = collection(db, 'accessKeys');
      //prepare query
      const q = query(accessKeyRef, where('key', '==', inputVal.trim()));
      //start query and get results
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // getting doocument reference
        const docSnap = querySnapshot.docs[0];
        // data object
        const data = docSnap.data();

        // getting document ref
        const docRef = doc(db, 'accessKeys', docSnap.id);

        if (new Date() > data.expiresAt.toDate()) {
          await updateDoc(docRef, { isValid: false });
          throw new Error('Access key has expired!');
        }
        if (!data.isValid)
          throw new Error(
            'This access key is not more valid! Please request another access key by admin.'
          );

        // if access confirmed
        //update document
        await updateDoc(docRef, { isValid: false });

        toast.success(
          'Access key successfully confirmed. You will be redirected to register page.'
        );
        sessionStorage.setItem('access', 'true');
        dispatch(setAccess(true));
        navigate('/personal/register');
        return;
      } else {
        throw new Error('This access key does not exist!');
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <AccessKeyCard
        cardTitle="Confirm Your Access Key"
        descText="Please enter the access key given to you by the admin in the field below."
        btnText="Get Access"
        btnOnClick={verifyAccessKey}
        inputVal={inputVal}
        setInputVal={setInputVal}
        placeholder="Your access key here..."
      />
    </>
  );
}

export default ConfirmAccess;
