import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { registerSchema } from '@manegio/shared';
import Logo from '../../molecules/Logo';
import { GrFormView, GrFormViewHide } from 'react-icons/gr';
import UnderlinedInput from '../../atoms/UnderlinedInput';
import SideBySideInputContainer from '../../templates/SideBySideInputContainer';
import FormTitle from '../../atoms/FormTitle';
import Button from '../../atoms/Button';
import { toast } from 'sonner';
import { useRegisterMutation } from '@/store/api/authApi';
import { zodToFormikValidate } from '@/utils/zodToFormikValidate';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { FontSizes, LogoSizes } from '@/types/enums/LogoEnums';

const RegisterForm = () => {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, touched, errors, isSubmitting, setSubmitting } =
    useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        companyName: '',
      },
      validate: zodToFormikValidate(registerSchema),
      onSubmit: async (data) => {
        try {
          await register(data).unwrap();
          toast.success(`Welcome to Manegio, ${data.companyName} is ready to go!`);
          navigate('/admin');
        } catch (error) {
          toast.error(getErrorMessage(error, 'Registration failed.'));
        } finally {
          setSubmitting(false);
        }
      },
    });

  return (
    <form
      onSubmit={handleSubmit}
      className="container max-w-md lg:rounded-lg px-4 py-8 flex flex-col gap-4 text-lg bg-white lg:border lg:shadow-md sm:max-w-lg md:max-w-xl lg:max-w-3xl lg:py-8 xl:py-10"
    >
      <div className="w-full h-fit flex justify-center">
        <Logo FontSize={FontSizes.semiRegular} LogoSize={LogoSizes.semiRegular} />
      </div>
      <FormTitle titleText="Create your restaurant's account" />

      <SideBySideInputContainer
        isByMdScreensInputsGrid={true}
        left={
          <UnderlinedInput
            labelText="First name"
            inputValue={values.firstName}
            onInputChange={handleChange}
            onInputBlur={handleBlur}
            inputId="firstName"
            inputPlaceHolder="Your first name..."
            errors={errors}
            touched={touched}
          />
        }
        right={
          <UnderlinedInput
            labelText="Last name"
            inputValue={values.lastName}
            onInputChange={handleChange}
            onInputBlur={handleBlur}
            inputId="lastName"
            inputPlaceHolder="Your last name..."
            errors={errors}
            touched={touched}
          />
        }
      />

      <UnderlinedInput
        labelText="Company name"
        inputValue={values.companyName}
        onInputChange={handleChange}
        onInputBlur={handleBlur}
        inputId="companyName"
        inputPlaceHolder="e.g. Trattoria Bella"
        errors={errors}
        touched={touched}
      />

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
        inputType="password"
        inputPlaceHolder="Please enter your password..."
        errors={errors}
        touched={touched}
        hasIcon={true}
        Icon={GrFormViewHide}
        SecondIcon={GrFormView}
      />

      <UnderlinedInput
        labelText="Confirm password"
        inputValue={values.passwordConfirm}
        onInputChange={handleChange}
        onInputBlur={handleBlur}
        inputId="passwordConfirm"
        inputType="password"
        inputPlaceHolder="Please confirm your password..."
        errors={errors}
        touched={touched}
        hasIcon={true}
        Icon={GrFormViewHide}
        SecondIcon={GrFormView}
      />

      <div className="flex flex-col items-center gap-5 mt-4">
        <Button isSubmitInProgress={isSubmitting} type="submit" text="Register" />
      </div>
    </form>
  );
};

export default RegisterForm;
