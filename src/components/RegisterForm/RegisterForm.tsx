import { useFormik } from 'formik';
import { RegisterFormSchema } from '../../schemas/RegisterFormSchema';
import Logo from '../Logo';
import { FontSizes, LogoSizes } from '../../types/models/LogoModels';
import { useRef, useState } from 'react';
import { GrFormView, GrFormViewHide } from 'react-icons/gr';
import AddressAutocomplete from '../AddressAutocomplete';
import FormInputUnderlined from '../FormComponents/FormInputUnderlined';
import SideBySideInputContainer from '../FormComponents/SideBySideInputContainer';
import FormTitle from '../FormComponents/FormTitle';
import { FormInputUnderlinedProps } from '@/types/models/ComponentPromptModels';
import { ButtonDirections } from '@/types/models/ComponentPromptModels';
import FunctionalFormButton from '../FormComponents/FunctionalFormButton';

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const parentDivRef = useRef<HTMLDivElement>(null);
  const [countryVal, setCountryVal] = useState('');
  const totalFormStep = useRef(2);
  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      pass: '',
      passConfirm: '',
      street: '',
      houseNo: '',
      state: '',
      postalCode: '',
      city: '',
    },
    validationSchema: RegisterFormSchema,
    onSubmit: onSubmit,
  });
  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    errors,
    isSubmitting,
  } = formik;

  function onSubmit(data: any) {
    // submitted
    data.country = countryVal;
    console.log(data);
  }
  const handleNext = () => {
    if (step >= totalFormStep.current) return;
    parentDivRef.current?.classList.add(
      'transition-transform',
      '-translate-x-full',
      'duration-300'
    );
    parentDivRef.current?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
    setTimeout(() => {
      setStep(step + 1);
    }, 280);
  };
  const handlePrev = () => {
    if (step < 1) return;
    parentDivRef.current?.classList.add(
      'transition-transform',
      'translate-x-full',
      'duration-300'
    );
    parentDivRef.current?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
    setTimeout(() => {
      setStep(step - 1);
    }, 310);
  };
  const formFields: FormInputUnderlinedProps[] = [
    {
      labelText: 'Email',
      inputValue: values.email,
      inputId: 'email',
      inputType: 'text',
      inputPlaceHolder: 'Please enter your email...',
      hasIcon: false,
    },
    {
      labelText: 'Password',
      inputValue: values.pass,
      inputId: 'pass',
      inputType: 'password',
      inputPlaceHolder: 'Please enter your pass...',
      hasIcon: true,
      Icon: GrFormViewHide,
      SecondIcon: GrFormView,
    },
    {
      labelText: 'Confirm Password',
      inputValue: values.passConfirm,
      inputId: 'passConfirm',
      inputType: 'password',
      inputPlaceHolder: 'Please confirm your password...',
      hasIcon: true,
      Icon: GrFormViewHide,
      SecondIcon: GrFormView,
    },
  ];
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="overflow-y-auto container h-full max-h-min max-w-md lg:rounded-lg px-4 py-8 flex flex-col gap-2 justify-evenly text-lg bg-white lg:border lg:shadow-sm 2xl:shadow-md sm:max-w-lg md:max-w-xl lg:max-w-3xl lg:py-8 xl:py-10 lg:gap-8"
        action="#"
      >
        <div className="w-full h-fit flex justify-center">
          <Logo
            FontSize={FontSizes.semiRegular}
            LogoSize={LogoSizes.semiRegular}
          />
        </div>
        <FormTitle titleText="Register" />
        {step === 1 ? (
          <div
            ref={parentDivRef}
            className="flex flex-col flex-shrink-0 flex-[1] gap-2 md:gap-3 lg:gap-4 w-full max-w-lg mx-auto"
          >
            <SideBySideInputContainer
              left={
                <FormInputUnderlined
                  labelText={'Name'}
                  inputValue={values.name}
                  onInputChange={handleChange}
                  onInputBlur={handleBlur}
                  inputId={'name'}
                  inputPlaceHolder={'Please enter your name...'}
                  errors={errors}
                  touched={touched}
                />
              }
              right={
                <FormInputUnderlined
                  labelText={'Surname'}
                  inputValue={values.surname}
                  onInputChange={handleChange}
                  onInputBlur={handleBlur}
                  inputId={'surname'}
                  inputPlaceHolder={'Please enter your surname...'}
                  errors={errors}
                  touched={touched}
                />
              }
            />
            {formFields.map((item, index) => {
              return item.hasIcon ? (
                <FormInputUnderlined
                  key={index}
                  labelText={item.labelText}
                  inputValue={item.inputValue}
                  inputType={item.inputType}
                  onInputChange={handleChange}
                  onInputBlur={handleBlur}
                  inputId={item.inputId}
                  inputPlaceHolder={item.inputPlaceHolder}
                  errors={errors}
                  touched={touched}
                  hasIcon={item.hasIcon}
                  Icon={item.Icon}
                  SecondIcon={item.SecondIcon}
                />
              ) : (
                <FormInputUnderlined
                  key={index}
                  labelText={item.labelText}
                  inputValue={item.inputValue}
                  inputType={item.inputType}
                  onInputChange={handleChange}
                  onInputBlur={handleBlur}
                  inputId={item.inputId}
                  inputPlaceHolder={item.inputPlaceHolder}
                  errors={errors}
                  touched={touched}
                />
              );
            })}
          </div>
        ) : (
          ''
        )}
        {step === 2 ? (
          <div ref={parentDivRef}>
            <AddressAutocomplete
              setCountryVal={setCountryVal}
              formik={formik}
            />
          </div>
        ) : (
          ''
        )}

        {/* Buttons */}
        <div className="flex justify-evenly items-center gap-5 mt-6">
          <FunctionalFormButton
            buttonText="Prev"
            formCurrentStep={step}
            formLastStep={2}
            isDirectable={true}
            buttonDirection={ButtonDirections.backward}
            isSubmitInProgress={isSubmitting}
            onButtonClick={handlePrev}
          />
          <FunctionalFormButton
            buttonText="Next"
            formCurrentStep={step}
            formLastStep={2}
            isDirectable={true}
            buttonDirection={ButtonDirections.forward}
            isSubmitInProgress={isSubmitting}
            onButtonClick={handleNext}
          />
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
