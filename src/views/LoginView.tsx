import LoginForm from '../components/organisms/LoginForm';
import FormPagesesContainer from '../components/templates/FormPagesesContainer';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Navigate } from 'react-router-dom';

function LoginView() {
  const userId = useSelector(
    (store: RootState) => store.onAuthChangeState.user.uid
  );
  console.log('/login active');
  console.log(userId);
  if (userId) {
    return <Navigate to={'/'} />;
  } else {
    return (
      <>
        <FormPagesesContainer>
          <LoginForm />
        </FormPagesesContainer>
      </>
    );
  }
}

export default LoginView;
