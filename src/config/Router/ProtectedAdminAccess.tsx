import { Navigate, Outlet } from 'react-router-dom';

function ProtectedAdminAccess() {
  const isAuth = true;
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedAdminAccess;
