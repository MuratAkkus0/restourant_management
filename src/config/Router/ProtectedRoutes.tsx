import { RootState } from '@/store/store';
import { ProtectedRoutesProps } from '@/types/models/AuthModels';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ allowedRoles }) => {
  const userData = useSelector((store: RootState) => store.onAuthChangeState);
  console.log(userData);
  if (
    !userData.loading &&
    (!userData.user || !allowedRoles || !allowedRoles.includes(userData.role))
  ) {
    return <Navigate to="/login" />;
  } else return <Outlet />;
};

export default ProtectedRoutes;
