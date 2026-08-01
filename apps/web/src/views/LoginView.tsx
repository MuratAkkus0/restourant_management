import LoginForm from '../components/organisms/LoginForm';
import FormPagesesContainer from '../components/templates/FormPagesesContainer';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Navigate } from 'react-router-dom';

function LoginView() {
  const status = useSelector((store: RootState) => store.auth.status);
  if (status === 'authenticated') {
    return <Navigate to={'/admin'} />;
  }
  return (
    <>
      <FormPagesesContainer>
        <LoginForm />
      </FormPagesesContainer>
    </>
  );
}

export default LoginView;
