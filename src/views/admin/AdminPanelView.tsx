import { Outlet, useNavigate } from 'react-router-dom';
import DashMenu from '../../components/organisms/dashboard/DashMenu';
import { useEffect } from 'react';

function AdminPanelView() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('overview');
  }, []);
  return (
    <div className="w-full h-full flex md:gap-2">
      <DashMenu />
      <Outlet />
    </div>
  );
}

export default AdminPanelView;
