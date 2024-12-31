import LoginForm from '../components/LoginForm';
import SideImage from '../assets/images/Login_page_side.jpg';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useWindowSizes from '../customHooks/useWindowSizes';
import FormPagesesContainer from '../components/FormPagesesContainer';

function LoginView() {
  const [width] = useWindowSizes();

  return (
    <FormPagesesContainer>
      <LoginForm />
    </FormPagesesContainer>
  );
}

export default LoginView;
