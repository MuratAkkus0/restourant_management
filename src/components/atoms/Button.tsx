import { ButtonProps } from '@/types/models/atoms/Button';
import { memo } from 'react';

const Button: React.FC<ButtonProps> = ({
  text,
  type = 'button',
  isSubmitInProgress = false,
  onBtnClick,
}) => {
  const conditionalStyle = `${isSubmitInProgress ? 'bg-red-400' : 'bg-gradient-to-r from-orange-500 to-red-600'}`;
  return (
    <>
      <button
        onClick={onBtnClick}
        type={type}
        className={`${conditionalStyle} text-white w-28 md:w-32 h-9 md:h-10 lg:w-40 lg:h-12 rounded-md cursor-pointer hover:scale-[1.01] active:scale-[.99] shadow-sm text-xs sm:text-sm lg:text-lg lg:py-2 font-Poppins font-light`}
      >
        {text}
      </button>
    </>
  );
};

export default memo(Button);
