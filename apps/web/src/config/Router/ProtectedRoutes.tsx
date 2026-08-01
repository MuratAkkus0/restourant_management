import type { Role } from '@manegio/shared';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '@/components/atoms/Loading';

type ProtectedRoutesProps = {
  allowedRoles: Role[];
};

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ allowedRoles }) => {
  const { status, user } = useSelector((store: RootState) => store.auth);

  // Still restoring the session from the httpOnly refresh cookie - avoid a
  // flash-redirect to /login before we actually know whether it succeeded.
  if (status === 'checking') {
    return <Loading />;
  }

  if (status === 'unauthenticated' || !user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
