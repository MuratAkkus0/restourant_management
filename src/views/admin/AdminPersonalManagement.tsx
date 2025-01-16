import GenerateLinkCard from '@/components/molecules/GenerateLinkCard';
import LinkList from '@/components/molecules/LinkList';
import AdminPanelsPagesContainer from '@/components/templates/AdminPanelsPagesContainer';
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
    <AdminPanelsPagesContainer>
      <GenerateLinkCard
        link={registerLink}
        onClickCreateLink={createRegisterationLink}
      />
      <LinkList />
    </AdminPanelsPagesContainer>
  );
}

export default AdminPersonalManagement;
