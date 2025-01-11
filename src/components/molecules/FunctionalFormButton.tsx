import { ButtonDirections } from '@/types/enums/FunctionalFormButtonEnums';
import { FunctionalFormButtonProps } from '@/types/models/molecules/FunctionalFormButtonModels';
import { useEffect, useState } from 'react';
import Button from '../atoms/Button';

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
        <>
          <Button
            text={buttonText}
            type={
              formCurrentStep === formLastStep &&
                buttonDirection === ButtonDirections.forward
                ? 'submit'
                : 'button'
            }
            isSubmitInProgress={isSubmitInProgress}
            onBtnClick={onButtonClick}
          />
        </>
      )}
    </>
  );
}

export default FunctionalFormButton;
