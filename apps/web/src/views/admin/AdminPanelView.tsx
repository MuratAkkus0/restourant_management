import { Outlet, useNavigate } from 'react-router-dom';
import DashMenu from '../../components/organisms/dashboard/DashMenu';
import { useEffect } from 'react';
import AdminPanelsPagesContainer from '@/components/templates/AdminPanelsPagesContainer';

function AdminPanelView() {
  const navigate = useNavigate();
  useEffect(() => {
    const url = window.location.href.split('/').pop();
    if (url === 'admin') navigate('overview');
  }, []);
  return (
    <div className="w-full h-full flex pl-4 md:pl-0 md:gap-5">
      <DashMenu />
      <AdminPanelsPagesContainer>
        <Outlet />
      </AdminPanelsPagesContainer>
    </div>
  );
}

export default AdminPanelView;
