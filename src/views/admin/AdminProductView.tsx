import AdminPanelsPagesContainer from '@/components/templates/AdminPanelsPagesContainer';
import { Outlet } from 'react-router-dom';

export interface AdminProductViewProps {
  children: React.ReactNode;
}

const AdminProductView = () => {
  return (
    <>
      <AdminPanelsPagesContainer>
        <Outlet />
      </AdminPanelsPagesContainer>
    </>
  );
};

export default AdminProductView;
