import { useFormik } from 'formik';
import { RegisterFormSchema } from '../../schemas/RegisterFormSchema';
import Logo from '../Logo';
import { FontSizes, LogoSizes } from '../../types/models/LogoModels';
import { useRef, useState } from 'react';
import { GrFormView, GrFormViewHide } from 'react-icons/gr';
import AddressAutocomplete from '../AddressAutocomplete';

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
    }, 290);
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
            className="flex flex-col flex-shrink-0 flex-1 gap-2 md:gap-3 lg:gap-4"
          >
            <div className="flex flex-col gap-2 flex-shrink-0 md:flex-row md:gap-14">
              <div className="flex-1 flex flex-col gap-2 flex-shrink-0">
                <label
                  className="flex flex-col gap-2 text-base md:text-lg font-normal sm:font-medium "
                  htmlFor="email"
                >
                  Name :
                </label>
                <input
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="name"
                  name="name"
                  type="text"
                  className={`w-full border-b py-1 px-2 placeholder:text-base focus:outline-none transition-[border-color] ${errors.name && touched.name ? 'border-b-red-600' : 'focus:border-gray-500 '}`}
                  placeholder="Please enter your name..."
                />
                {errors.name && touched.name ? (
                  <p className="text-red-600 text-sm font-medium first-letter:uppercase">
                    {errors.name}
                  </p>
                ) : (
                  ''
                )}
              </div>
              <div className="flex-1 flex flex-col gap-2 flex-shrink-0">
                <label
                  className="flex flex-col gap-2 text-base md:text-lg font-normal sm:font-medium "
                  htmlFor="email"
                >
                  Surname :
                </label>
                <input
                  value={values.surname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="surname"
                  name="surname"
                  type="text"
                  className={`w-full border-b py-1 px-2 placeholder:text-base focus:outline-none transition-[border-color] ${errors.surname && touched.surname ? 'border-b-red-600' : 'focus:border-gray-500 '}`}
                  placeholder="Please enter your surname..."
                />
                {errors.surname && touched.surname ? (
                  <p className="text-red-600 text-sm font-medium first-letter:uppercase">
                    {errors.surname}
                  </p>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              <label
                className="flex flex-col gap-2 text-base md:text-lg font-normal sm:font-medium "
                htmlFor="email"
              >
                Email :
              </label>
              <input
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                id="email"
                name="email"
                type="email"
                className={`w-full border-b py-1 px-2 placeholder:text-base focus:outline-none transition-[border-color] ${errors.email && touched.email ? 'border-b-red-600' : 'focus:border-gray-500 '}`}
                placeholder="Please enter your email..."
              />
              {errors.email && touched.email ? (
                <p className="text-red-600 text-sm font-medium first-letter:uppercase">
                  {errors.email}
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
                Password :
              </label>

              <div className="flex items-center relative">
                <input
                  value={values.pass}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="pass"
                  name="pass"
                  type={showPass ? 'text' : 'password'}
                  className={`w-full border-b py-1 px-2 placeholder:text-base focus:outline-none transition-[border-color] ${errors.pass && touched.pass ? 'border-b-red-600' : 'focus:border-gray-500 '}`}
                  placeholder="Please enter your password..."
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
              className={`${isSubmitting ? 'bg-red-400' : 'bg-gradient-to-r from-orange-500 to-red-600'} text-white px-10 py-1 leading-8 rounded-md cursor-pointer hover:scale-[1.01] active:scale-[.99] shadow-sm lg:text-lg lg:py-2 font-Poppins font-light`}
              type="button"
            >
              Prev Step
            </button>
          ) : (
            ''
          )}
          <button
            onClick={handleNext}
            className={`${isSubmitting ? 'bg-red-400' : 'bg-gradient-to-r from-orange-500 to-red-600'} text-white px-10 py-1 leading-8 rounded-md cursor-pointer hover:scale-[1.01] active:scale-[.99] shadow-sm lg:text-lg lg:py-2 font-Poppins font-light`}
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
