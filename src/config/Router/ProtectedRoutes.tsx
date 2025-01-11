import { RootState } from '@/store/store';
import { ProtectedRoutesProps } from '@/types/models/services/AuthModels';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ allowedRoles }) => {
  const userData = useSelector((store: RootState) => store.onAuthChangeState);
  console.log(userData);
  if (!userData.loading) {
    if (!userData.user || !allowedRoles.includes(userData.role)) {
      return <Navigate to="/login" />;
    } else return <Outlet />;
  }
};

export default ProtectedRoutes;
