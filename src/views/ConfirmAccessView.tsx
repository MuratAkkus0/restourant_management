import { MdKeyboardBackspace } from 'react-icons/md';
import ConfirmAccess from '../components/ConfirmAccess';
import { Link } from 'react-router-dom';
import useWindowSizes from '../customHooks/useWindowSizes';
import SideImage from '../assets/images/Login_page_side.jpg';
import FormPagesesContainer from '../components/FormPagesesContainer';

function ConfirmAccessView() {
  const [width] = useWindowSizes();

  return (
    <>
      <FormPagesesContainer>
        <ConfirmAccess />
      </FormPagesesContainer>
    </>
  );
}

export default ConfirmAccessView;
