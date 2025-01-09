import GoogleIco from '../assets/signin-assets/png4x/neutral/web_neutral_rd_SI4x.png';

function GoogleLogin() {
  return (
    <div className="flex justify-center">
      <img
        className="w-44 cursor-pointer hover:scale-[1.01] active:scale-[.99]"
        src={GoogleIco}
        alt=""
      />
    </div>
  );
}

export default GoogleLogin;
