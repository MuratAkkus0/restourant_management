import { ButtonDirections } from '@/types/enums/FunctionalFormButtonEnums';
import { FunctionalFormButtonProps } from '@/types/models/FunctionalFormButtonModels';
import { useEffect, useState } from 'react';

function FunctionalFormButton(props: FunctionalFormButtonProps) {
  const {
    buttonText,
    buttonDirection,
    isSubmitInProgress,
    formCurrentStep,
    formLastStep,
    onButtonClick,
  } = props;
  const [showBtn, setShowBtn] = useState(true);

  useEffect(() => {
    if (
      formCurrentStep === 1 &&
      buttonDirection === ButtonDirections.backward
    ) {
      setShowBtn(false);
    } else {
      setShowBtn(true);
    }
  }, [formCurrentStep, buttonDirection]);

  return (
    <>
      {showBtn && (
        <button
          onClick={onButtonClick}
          className={`${isSubmitInProgress ? 'bg-red-400' : 'bg-gradient-to-r from-orange-500 to-red-600'} text-white w-28 md:w-32 h-9 md:h-10 lg:w-40 lg:h-12 rounded-md cursor-pointer hover:scale-[1.01] active:scale-[.99] shadow-sm text-base md:text-lg lg:py-2 font-Poppins font-light`}
          type={
            formCurrentStep === formLastStep &&
            buttonDirection === ButtonDirections.forward
              ? 'submit'
              : 'button'
          }
        >
          {buttonText}
        </button>
      )}
    </>
  );
}

export default FunctionalFormButton;
