import { useNavigate } from 'react-router-dom';
import {
  FontSizes,
  LogoProperties,
  LogoSizes,
} from '../types/models/LogoModels';
import { IoRestaurantOutline } from 'react-icons/io5';

function Logo(props: LogoProperties) {
  const { FontSize = FontSizes.normal, LogoSize = LogoSizes.normal } = props;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('/')}
      className={`w-fit h-fit border border-red-600 select-none cursor-pointer 
         flex justify-center items-center bg-white rounded-md ${FontSize} text-accent`}
    >
      <IoRestaurantOutline className="text-red-600" size={LogoSize} />

      <span className="font-Lobster font-semibold shadow-sm text-red-600">
        Manegio
      </span>
    </div>
  );
}

export default Logo;
