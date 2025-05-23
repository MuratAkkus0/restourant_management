import { useNavigate } from 'react-router-dom';

import { IoRestaurantOutline } from 'react-icons/io5';
import { LogoProperties } from '@/types/models/molecules/LogoModels';
import { FontSizes, LogoSizes } from '@/types/enums/LogoEnums';
import { memo } from 'react';

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

      <span className=" font-Lobster font-medium italic shadow-sm text-red-600">
        Manegio
      </span>
    </div>
  );
}

export default memo(Logo);
