import { useFormik } from 'formik';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { acceptInviteSchema } from '@manegio/shared';
import FormPagesesContainer from '../components/templates/FormPagesesContainer';
import Logo from '../components/molecules/Logo';
import FormTitle from '../components/atoms/FormTitle';
import UnderlinedInput from '../components/atoms/UnderlinedInput';
import Button from '../components/atoms/Button';
import { useAcceptInviteMutation } from '@/store/api/authApi';
import { zodToFormikValidate } from '@/utils/zodToFormikValidate';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { FontSizes, LogoSizes } from '@/types/enums/LogoEnums';

function AcceptInviteView() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [acceptInvite] = useAcceptInviteMutation();
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, touched, errors, isSubmitting, setSubmitting } =
    useFormik({
      initialValues: { firstName: '', lastName: '', password: '', passwordConfirm: '', token },
      validate: zodToFormikValidate(acceptInviteSchema),
      onSubmit: async (data) => {
        try {
          await acceptInvite(data).unwrap();
          toast.success('Welcome aboard!');
          navigate('/admin');
        } catch (error) {
          toast.error(getErrorMessage(error, 'This invite link could not be used.'));
        } finally {
          setSubmitting(false);
        }
      },
    });

  if (!token) {
    return (
      <FormPagesesContainer>
        <p className="text-red-600">This invite link is missing its token. Please use the link you were sent.</p>
      </FormPagesesContainer>
    );
  }

  return (
    <FormPagesesContainer>
      <form
        onSubmit={handleSubmit}
        className="container max-w-md lg:rounded-lg px-4 py-8 flex flex-col gap-4 text-lg bg-white lg:border lg:shadow-md sm:max-w-lg md:max-w-xl lg:max-w-3xl lg:py-8 xl:py-10"
      >
        <div className="w-full h-fit flex justify-center">
          <Logo FontSize={FontSizes.semiRegular} LogoSize={LogoSizes.semiRegular} />
        </div>
        <FormTitle titleText="Join your team on Manegio" />

        <UnderlinedInput
          labelText="First name"
          inputId="firstName"
          inputValue={values.firstName}
          onInputChange={handleChange}
          onInputBlur={handleBlur}
          errors={errors}
          touched={touched}
        />
        <UnderlinedInput
          labelText="Last name"
          inputId="lastName"
          inputValue={values.lastName}
          onInputChange={handleChange}
          onInputBlur={handleBlur}
          errors={errors}
          touched={touched}
        />
        <UnderlinedInput
          labelText="Password"
          inputId="password"
          inputType="password"
          inputValue={values.password}
          onInputChange={handleChange}
          onInputBlur={handleBlur}
          errors={errors}
          touched={touched}
        />
        <UnderlinedInput
          labelText="Confirm password"
          inputId="passwordConfirm"
          inputType="password"
          inputValue={values.passwordConfirm}
          onInputChange={handleChange}
          onInputBlur={handleBlur}
          errors={errors}
          touched={touched}
        />

        <div className="flex flex-col items-center gap-5 mt-4">
          <Button isSubmitInProgress={isSubmitting} type="submit" text="Join team" />
        </div>
      </form>
    </FormPagesesContainer>
  );
}

export default AcceptInviteView;
