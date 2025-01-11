import { FormEvent, MouseEvent, useRef, useState } from 'react';
import FunctionalFormButton from '../molecules/FunctionalFormButton';
import { toast } from 'sonner';
import { StepByStepFormContainerProps } from '@/types/models/templates/StepByStepFormContainer';
import { ButtonDirections } from '@/types/enums/FunctionalFormButtonEnums';

function StepByStepFormContainer({
  formLogo,
  formTitle,
  formAllStepComponents,
  isSubmitting,
  prevButtonText = 'Prev',
  nextButtonText = 'Next',
  submitButtonText = 'Submit',
  formik,
}: StepByStepFormContainerProps) {
  const [currentFormStep, setCurrentFormStep] = useState(1);
  const parentDivRef = useRef<HTMLDivElement>(null);
  const totalFormSteps = useRef(formAllStepComponents.length);
  const { handleSubmit } = formik;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(Object.keys(formik.errors));
    if (Object.keys(formik.errors).length >= 0) {
      handleSubmit(e);
    } else {
      toast.error('Please ensure all fields are filled out correctly.');
      handlePrev();
    }
  };

  const handleNext = () => {
    if (currentFormStep >= totalFormSteps.current) return;
    parentDivRef.current?.classList.add(
      'transition-transform',
      '-translate-x-[120%]',
      'duration-300'
    );
    parentDivRef.current?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
    setTimeout(() => {
      setCurrentFormStep(currentFormStep + 1);
    }, 280);
  };
  const handlePrev = (e?: MouseEvent<HTMLButtonElement>) => {
    if (currentFormStep < 1) return;
    parentDivRef.current?.classList.add(
      'transition-transform',
      'translate-x-[120%]',
      'duration-300'
    );
    parentDivRef.current?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
    setTimeout(() => {
      if (!e) setCurrentFormStep(1);
      setCurrentFormStep(currentFormStep - 1);
    }, 310);
  };
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="overflow-y-auto container h-full max-h-min max-w-md lg:rounded-lg px-4 py-8 flex flex-col gap-2 justify-evenly text-lg bg-white lg:border lg:shadow-sm 2xl:shadow-md sm:max-w-lg md:max-w-xl lg:max-w-3xl lg:py-8 xl:py-10 lg:gap-8"
        action="#"
      >
        <div className="w-full h-fit flex justify-center">{formLogo}</div>
        {formTitle}
        {formAllStepComponents.map((item, key) =>
          currentFormStep === key + 1 ? (
            <div
              key={key}
              ref={parentDivRef}
              className="flex flex-col flex-shrink-0 flex-[1] gap-2 md:gap-3 lg:gap-4 w-full max-w-lg mx-auto"
            >
              {item}
            </div>
          ) : (
            ''
          )
        )}

        {/* Buttons */}
        <div className="flex justify-evenly items-center gap-5 mt-6">
          <FunctionalFormButton
            buttonText={prevButtonText}
            formCurrentStep={currentFormStep}
            formLastStep={totalFormSteps.current}
            isDirectable={true}
            buttonDirection={ButtonDirections.backward}
            isSubmitInProgress={isSubmitting}
            onButtonClick={handlePrev}
          />
          <FunctionalFormButton
            buttonText={
              currentFormStep === totalFormSteps.current
                ? submitButtonText
                : nextButtonText
            }
            formCurrentStep={currentFormStep}
            formLastStep={totalFormSteps.current}
            isDirectable={true}
            buttonDirection={ButtonDirections.forward}
            isSubmitInProgress={isSubmitting}
            onButtonClick={handleNext}
          />
        </div>
      </form>
    </>
  );
}

export default StepByStepFormContainer;
