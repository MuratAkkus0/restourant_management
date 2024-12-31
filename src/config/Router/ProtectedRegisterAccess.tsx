import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../store/store';

function ProtectedRegisterAccess() {
  const auth = useSelector((store: RootState) => store.registerAccess.access);
  console.log(auth);
  const isAuth = auth;
  return isAuth ? <Outlet /> : <Navigate to={'/confirm-access'} />;
}

export default ProtectedRegisterAccess;
