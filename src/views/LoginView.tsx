import LoginForm from '../components/LoginForm';
import FormPagesesContainer from '../components/FormPagesesContainer';
import { PropagateLoader } from 'react-spinners';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

function LoginView() {
  const isLoading = useSelector(
    (store: RootState) => store.authProcess.loading
  );
  return (
    <FormPagesesContainer>
      {isLoading ? (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#00000037] z-10 flex justify-center items-center">
          <PropagateLoader color="rgb(220 38 38)" />
        </div>
      ) : (
        ''
      )}
      <LoginForm />
    </FormPagesesContainer>
  );
}

export default LoginView;
