import { useFormik } from 'formik';
import { RegisterFormSchema } from '../../schemas/RegisterFormSchema';
import Logo from '../Logo';
import { FontSizes, LogoSizes } from '../../types/models/LogoModels';
import { useRef, useState } from 'react';
import { GrFormView, GrFormViewHide } from 'react-icons/gr';
import AddressAutocomplete from '../AddressAutocomplete';
import FormInputUnderlined from '../FormComponents/FormInputUnderlined';
import SideBySideInputContainer from '../FormComponents/SideBySideInputContainer';

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const parentDivRef = useRef<HTMLDivElement>(null);
  const [countryVal, setCountryVal] = useState('');
  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    errors,
    isSubmitting,
  } = useFormik({
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

  function onSubmit(data: any) {
    // submitted
    data.country = countryVal;
    console.log(data);
  }
  const handleNext = () => {
    parentDivRef.current?.classList.add(
      'transition-transform',
      '-translate-x-full',
      'duration-300'
    );
    setTimeout(() => {
      setStep(2);
    }, 280);
  };
  const handlePrev = () => {
    if (step < 1) return;
    parentDivRef.current?.classList.add(
      'transition-transform',
      'translate-x-full',
      'duration-300'
    );
    setTimeout(() => {
      setStep(step - 1);
    }, 310);
  };
  const formFields = {
    name: {
      labelText: 'Name',
      inputValue: values.name,
      inputId: 'name',
      inputPlaceHolder: 'Please enter your name...',
    },
    surname: {
      labelText: 'Name',
      inputValue: values.name,
      inputId: 'name',
      inputPlaceHolder: 'Please enter your name...',
    },
    email: {
      labelText: 'Name',
      inputValue: values.name,
      inputId: 'name',
      inputPlaceHolder: 'Please enter your name...',
    },
    pass: {
      labelText: 'Name',
      inputValue: values.name,
      inputId: 'name',
      inputPlaceHolder: 'Please enter your name...',
    },
    passConfirm: {
      labelText: 'Name',
      inputValue: values.name,
      inputId: 'name',
      inputPlaceHolder: 'Please enter your name...',
    },
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden container max-w-md lg:rounded-lg px-4 py-8 flex flex-col gap-2 justify-evenly text-lg bg-white lg:border lg:shadow-md sm:max-w-lg md:max-w-xl lg:max-w-3xl lg:py-8 xl:py-10 lg:gap-8"
        action="#"
      >
        <div className="w-full h-fit flex justify-center">
          <Logo
            FontSize={FontSizes.semiRegular}
            LogoSize={LogoSizes.semiRegular}
          />
        </div>
        <h3 className="mx-auto mb-10 text-2xl font-medium font-Phenomena sm:text-3xl">
          Register
        </h3>
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
            <FormInputUnderlined
              labelText={'Email'}
              inputValue={values.email}
              onInputChange={handleChange}
              onInputBlur={handleBlur}
              inputId={'email'}
              inputPlaceHolder={'Please enter your email...'}
              errors={errors}
              touched={touched}
            />
            <FormInputUnderlined
              labelText={'Password'}
              inputValue={values.pass}
              inputType="password"
              onInputChange={handleChange}
              onInputBlur={handleBlur}
              inputId={'pass'}
              inputPlaceHolder={'Please enter your password...'}
              errors={errors}
              touched={touched}
              hasIcon={true}
              Icon={<GrFormViewHide />}
            />
            <div className="flex flex-col gap-2 flex-shrink-0">
              <div className="flex items-center relative">
                <input />
                <div className="absolute right-2 text-2xl w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-50 transition-colors duration-300 active:scale-95">
                  {!showPass ? (
                    <GrFormViewHide
                      size={26}
                      onClick={() => setShowPass(true)}
                    />
                  ) : (
                    <GrFormView size={26} onClick={() => setShowPass(false)} />
                  )}
                </div>
              </div>
              {errors.pass && touched.pass ? (
                <p className="text-sm text-red-600 font-medium first-letter:uppercase">
                  {errors.pass}
                </p>
              ) : (
                ''
              )}
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              <label
                className="flex flex-col gap-2 text-base md:text-lg font-normal sm:font-medium "
                htmlFor="pass"
              >
                Confirm Password :
              </label>

              <div className="flex items-center relative">
                <input
                  value={values.passConfirm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="passConfirm"
                  name="passConfirm"
                  type={showPass ? 'text' : 'password'}
                  className={`w-full border-b py-1 px-2 placeholder:text-base focus:outline-none transition-[border-color] ${errors.passConfirm && touched.passConfirm ? 'border-b-red-600' : 'focus:border-gray-500 '}`}
                  placeholder="Please confirm your password..."
                />
                <div className="absolute right-2 text-2xl w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-50 transition-colors duration-300 active:scale-95">
                  {!showPass ? (
                    <GrFormViewHide
                      size={26}
                      onClick={() => setShowPass(true)}
                    />
                  ) : (
                    <GrFormView size={26} onClick={() => setShowPass(false)} />
                  )}
                </div>
              </div>
              {errors.passConfirm && touched.passConfirm ? (
                <p className="text-sm text-red-600 font-medium first-letter:uppercase">
                  {errors.passConfirm}
                </p>
              ) : (
                ''
              )}
            </div>
          </div>
        ) : (
          ''
        )}
        {step === 2 ? (
          <div ref={parentDivRef}>
            <AddressAutocomplete
              setCountryVal={setCountryVal}
              handleChange={handleChange}
              handleBlur={handleBlur}
              houseNoVal={values.houseNo}
              stateVal={values.state}
              postalCodeVal={values.postalCode}
              cityVal={values.city}
            />
          </div>
        ) : (
          ''
        )}

        {/* Buttons */}
        <div className="flex justify-evenly items-center gap-5 mt-6">
          {step !== 1 ? (
            <button
              onClick={handlePrev}
              className={`${isSubmitting ? 'bg-red-400' : 'bg-gradient-to-r from-orange-500 to-red-600'} text-white w-28 md:w-32 h-9 md:h-10 lg:w-40 lg:h-12 rounded-md cursor-pointer hover:scale-[1.01] active:scale-[.99] shadow-sm text-base md:text-lg lg:py-2 font-Poppins font-light`}
              type="button"
            >
              Prev Step
            </button>
          ) : (
            ''
          )}
          <button
            onClick={handleNext}
            className={`${isSubmitting ? 'bg-red-400' : 'bg-gradient-to-r from-orange-500 to-red-600'} text-white w-28 md:w-32 h-9 md:h-10 lg:w-40 lg:h-12 rounded-md cursor-pointer hover:scale-[1.01] active:scale-[.99] shadow-sm md:text-lg lg:py-2 font-Poppins font-light`}
            type={step == 2 ? 'submit' : 'button'}
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;

{
  /* <div className="mx-auto w-full relative h-1 flex items-center px-16 sm:px-32 rounded-full select-none">
              <hr className="w-full " />
              <p className="w-7 text-center text-gray-500 text-sm absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white">
                Or
              </p>
            </div>
            <div className="">
              <GoogleLogin />
            </div> */
}
