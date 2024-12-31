import { useNavigate } from 'react-router-dom';
import GoogleIco from '../assets/signin-assets/png4x/neutral/web_neutral_rd_SI4x.png';
import { GoogleLoginInputObj } from '../types/models/AuthModels';
import { googleLogin } from '../store/slices/authProcesses';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';

function GoogleLogin() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const authWithGoogle = () => {
    const data: GoogleLoginInputObj = {
      onSuccess: () => navigate('/'),
    };
    dispatch(googleLogin(data));
  };
  return (
    <div className="flex justify-center">
      <img
        onClick={authWithGoogle}
        className="w-44 cursor-pointer hover:scale-[1.01] active:scale-[.99]"
        src={GoogleIco}
        alt=""
      />
    </div>
  );
}

export default GoogleLogin;
