import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes() {
  const isAuth = false;
  return isAuth ? <Outlet /> : <Navigate to={'/confirm-access'} />;
}

export default ProtectedRoutes;
