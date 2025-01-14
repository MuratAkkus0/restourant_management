import Button from '@/components/atoms/Button';
import useRegisterGenerateAccessKey from '@/customHooks/useRegisterGenerateAccessKey';
import { db } from '@/firebase/FirebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function AdminPersonalManagement() {
  const [registerLink, setRegisterLink] = useState('');
  const userData = useSelector((store: any) => store.onAuthChangeState);
  const generateAccessKey = useRegisterGenerateAccessKey();
  const createRegisterationLink = () => {
    console.log('creating registeration link...');
    console.log(window.location.pathname);

    generateAccessKey(userData.companyId)
      .then((key) => {
        // create url params
        const paramObj = { key: key, cId: userData.companyId };
        const params = new URLSearchParams(paramObj);
        const link = `${window.location.origin}/personal-register?${params.toString()}`;
        setRegisterLink(link);
        return link;
      })
      .then((link) => {
        addDoc(collection(db, 'registerationLinks'), {
          link: link,
          createdAt: serverTimestamp(),
          companyId: userData.companyId,
        });
        setRegisterLink(link);
        return;
      });
  };
  return (
    <div className="flex flex-col gap-2 w-full h-full justify-center items-center">
      <div className="border p-2">
        <a href={registerLink}>{registerLink}</a>
      </div>
      <Button
        type="button"
        onBtnClick={createRegisterationLink}
        text="Create Link"
      />
    </div>
  );
}

export default AdminPersonalManagement;
