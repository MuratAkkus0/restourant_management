import { ButtonProps } from '@/types/models/atoms/Button';
import { memo } from 'react';

const Button: React.FC<ButtonProps> = ({
  text,
  type = 'button',
  isSubmitInProgress = false,
  onBtnClick,
  className,
}) => {
  const conditionalStyle = `${isSubmitInProgress ? 'bg-red-400' : 'bg-gradient-to-r from-orange-500 to-red-600'}`;
  return (
    <>
      <button
        onClick={onBtnClick}
        type={type}
        className={`${conditionalStyle} ${className} text-white px-7 py-2 md:px-8 md:py-3 lg:px-9 lg:py-2 rounded-md cursor-pointer hover:scale-[1.01] active:scale-[.99] shadow-sm text-sm sm:text-sm lg:text-lg font-Poppins font-light`}
      >
        {text}
      </button>
    </>
  );
};

export default memo(Button);
