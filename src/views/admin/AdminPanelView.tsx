import { Outlet } from 'react-router-dom';
import DashMenu from '../../components/adminPanel/DashMenu';

function AdminPanel() {
  return (
    <div className="w-full h-full flex">
      <DashMenu />
      <Outlet />
    </div>
  );
}

export default AdminPanel;
