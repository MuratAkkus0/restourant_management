import Logo from '../molecules/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { GrFormView, GrFormViewHide } from 'react-icons/gr';
import { loginSchema } from '@manegio/shared';
import { toast } from 'sonner';
import { useLoginMutation } from '@/store/api/authApi';
import { zodToFormikValidate } from '@/utils/zodToFormikValidate';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { FontSizes, LogoSizes } from '@/types/enums/LogoEnums';
import Button from '../atoms/Button';
import UnderlinedInput from '../atoms/UnderlinedInput';
import Pharagrapf from '../atoms/Pharagrapf';

function LoginForm() {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const { values, handleSubmit, handleBlur, handleChange, touched, errors, isSubmitting, setSubmitting } =
    useFormik({
      initialValues: { email: '', password: '' },
      validate: zodToFormikValidate(loginSchema),
      onSubmit: async ({ email, password }) => {
        try {
          await login({ email, password }).unwrap();
          toast.success('Login successful! Welcome back.');
          navigate('/admin');
        } catch (error) {
          toast.error(getErrorMessage(error, 'Login failed.'));
        } finally {
          setSubmitting(false);
        }
      },
    });

  return (
    <form
      onSubmit={handleSubmit}
      className="container max-w-md lg:rounded-lg px-4 py-8 flex flex-col gap-2 justify-evenly text-lg bg-white lg:border lg:shadow-md sm:max-w-lg md:max-w-xl lg:max-w-3xl lg:py-8 xl:py-10 lg:gap-8"
      action="#"
    >
      <div className="w-full h-fit flex justify-center">
        <Logo FontSize={FontSizes.semiRegular} LogoSize={LogoSizes.semiRegular} />
      </div>
      <div className="flex flex-col flex-shrink-0 flex-1 gap-4">
        <h3 className="mx-auto text-2xl font-medium sm:text-3xl">Login</h3>

        <UnderlinedInput
          labelText="Email"
          inputValue={values.email}
          onInputChange={handleChange}
          onInputBlur={handleBlur}
          inputId="email"
          inputType="email"
          inputPlaceHolder="Please enter your email..."
          errors={errors}
          touched={touched}
        />

        <UnderlinedInput
          labelText="Password"
          inputValue={values.password}
          onInputChange={handleChange}
          onInputBlur={handleBlur}
          inputId="password"
          inputType={'password'}
          inputPlaceHolder="Please enter your password..."
          errors={errors}
          touched={touched}
          hasIcon={true}
          Icon={GrFormViewHide}
          SecondIcon={GrFormView}
        />

        <Pharagrapf size="2xs" className="w-full h-2 sm:text-sm">
          Don't have an account yet?{' '}
          <Link to="/register" className="underline underline-offset-1 text-blue-500">
            Register with email.
          </Link>
        </Pharagrapf>

        <div className="flex flex-col items-center gap-5 mt-6">
          <Button isSubmitInProgress={isSubmitting} type="submit" text="Login" />
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
