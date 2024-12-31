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
    <div className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl container py-10 px-6 border flex flex-col items-center justify-center lg:rounded-lg shadow-sm gap-5 p-2 bg-white">
      <div className="w-full flex flex-col items-center gap-4">
        <Logo
          FontSize={FontSizes.semiRegular}
          LogoSize={LogoSizes.semiRegular}
        />
        <h2 className="border-b font-medium text-xl sm:text-2xl xl:text-3xl">
          Confirm Your Access
        </h2>
      </div>
      <div className="w-full flex flex-col items-center gap-5 md:gap-4">
        <p className="text-md text-gray-500 leading-4 lg:leading-normal">
          <span className="text-red-600 font-medium">*</span> Please enter the
          access key given to you by the admin in the field below.
        </p>
        <input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Your access key here..."
          type="text"
          className="w-full h-8 border-b outline-none focus:border-b-black focus:border-gray-300 p-2 text-md sm:text-base lg:text-xl placeholder:text-md"
        />
        <button
          onClick={verifyAccessKey}
          className="px-10 py-1 rounded-lg bg-red-600 text-white text-base lg:text-xl hover:scale-[1.02] active:scale-[.98]"
        >
          Get Access
        </button>
      </div>
    </div>
  );
}

export default ConfirmAccess;
