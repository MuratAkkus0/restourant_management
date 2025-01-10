import Logo from './Logo';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useState } from 'react';
import { GrFormView, GrFormViewHide } from 'react-icons/gr';
import { LoginFormSchema } from '../schemas/LoginFormSchema';
import { toast } from 'sonner';
import { useLoginWithEmailPass } from '@/customHooks/useLoginWithEmailPass';
import { auth } from '@/firebase/FirebaseConfig';
import { FontSizes, LogoSizes } from '@/types/enums/LogoEnums';

function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const loginWithEmailPass = useLoginWithEmailPass();

  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    errors,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
      pass: '',
    },
    validationSchema: LoginFormSchema,
    onSubmit: onSubmit,
  });

  function onSubmit({ email, pass }: { email: string; pass: string }) {
    try {
      console.log(auth.currentUser);
      loginWithEmailPass(email, pass);
    } catch (error: any) {
      console.error(error);
      toast.error(error.code);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="container max-w-md lg:rounded-lg px-4 py-8 flex flex-col gap-2 justify-evenly text-lg bg-white lg:border lg:shadow-md sm:max-w-lg md:max-w-xl lg:max-w-3xl lg:py-8 xl:py-10 lg:gap-8"
        action="#"
      >
        <div className="w-full h-fit flex justify-center">
          <Logo
            FontSize={FontSizes.semiRegular}
            LogoSize={LogoSizes.semiRegular}
          />
        </div>
        <div className="flex flex-col flex-shrink-0 flex-1 gap-2">
          <h3 className="mx-auto text-2xl font-medium font-Phenomena sm:text-3xl">
            Login
          </h3>
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
                  <GrFormViewHide size={26} onClick={() => setShowPass(true)} />
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
          <p className="w-full h-2 text-sm sm:text-sm md:text-base">
            Don't have an account yet?{' '}
            <Link
              to="/register"
              className="underline underline-offset-1 text-blue-500"
            >
              Register with email
            </Link>
          </p>
          <div className="flex flex-col items-center gap-5 mt-6">
            <button
              className={`${isSubmitting ? 'bg-red-400' : 'bg-gradient-to-r from-orange-500 to-red-600'} text-white px-10 py-1 leading-8 rounded-md cursor-pointer hover:scale-[1.01] active:scale-[.99] shadow-sm lg:text-xl lg:py-2`}
              type="submit"
            >
              Login
            </button>
            {/* <div className="mx-auto w-full relative h-1 flex items-center px-16 sm:px-32 rounded-full select-none">
              <hr className="w-full " />
              <p className="w-7 text-center text-gray-500 text-sm absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white">
                Or
              </p>
            </div>
            <div className="">
              <GoogleLogin />
            </div> */}
          </div>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
