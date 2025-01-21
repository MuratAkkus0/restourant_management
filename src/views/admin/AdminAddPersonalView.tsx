import ConfirmChoiseBox from '@/components/molecules/ConfirmChoiseBox';
import GenerateLinkCard from '@/components/molecules/GenerateLinkCard';
import LinkList from '@/components/molecules/LinkList';
import useGenerateRegisterationLink from '@/customHooks/useGenerateRegisterationLink';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function AdminAddPersonalView() {
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
    <>
      <ConfirmChoiseBox />
      <GenerateLinkCard
        link={registerLink}
        onClickCreateLink={createRegisterationLink}
      />
      <LinkList />
    </>
  );
}

export default AdminAddPersonalView;
