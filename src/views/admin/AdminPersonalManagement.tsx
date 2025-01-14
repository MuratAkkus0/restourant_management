import Button from '@/components/atoms/Button';
import useGenerateRegisterationLink from '@/customHooks/useGenerateRegisterationLink';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function AdminPersonalManagement() {
  const [registerLink, setRegisterLink] = useState('');
  const userData = useSelector((store: any) => store.onAuthChangeState);
  const generateRegisterationLink = useGenerateRegisterationLink();
  const createRegisterationLink = () => {
    generateRegisterationLink(userData.companyId).then((link: string) => {
      setRegisterLink(link);
      return link;
    });
  };
  return (
    <div className="flex flex-col gap-2 w-full h-full justify-center items-center">
      <div className="border p-2">
        <a target="_blank" href={registerLink}>
          {registerLink}
        </a>
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
