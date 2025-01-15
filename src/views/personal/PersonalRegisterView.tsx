import PersonalRegisterForm from '@/components/organisms/PersonalRegisterForm';
import FormPagesesContainer from '@/components/templates/FormPagesesContainer';
import { usePersonalRegisterWithEmailPass } from '@/customHooks/usePersonalRegisterWithEmailPass';
import { deactiveAccessKey } from '@/features/authentication/deactiveRegisterAccessKey';
import { validateAccessKey } from '@/features/authentication/validateRegisterAccessKey';
import { auth } from '@/firebase/FirebaseConfig';
import { PersonalRegisterFormSchema } from '@/schemas/PersonalRegisterFormSchema';
import { setIsAppLoading } from '@/store/slices/appConfigSlice';
import { setIsLoading } from '@/store/slices/onAuthChangeState';
import { AppUserRoles } from '@/types/enums/AuthEnums';
import { RegisterServiceProps } from '@/types/models/services/RegisterNewPersonalModels';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

function PersonalRegister() {
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get('cId');
  const accessKey = searchParams.get('key');
  const personalRegisterWithEmailPass = usePersonalRegisterWithEmailPass();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      pass: '',
      passConfirm: '',
    },
    validationSchema: PersonalRegisterFormSchema,
    onSubmit: onSubmit,
  });

  const {
    values,
    handleBlur,
    handleChange,
    touched,
    errors,
    isSubmitting,
    handleSubmit,
    setSubmitting,
  } = formik;

  useEffect(() => {
    if (!accessKey || !companyId) {
      throw new Error('Something went wrong. Please contact with admin.');
    }
    // Validate Access Key
    validateAccessKey({ accessKey, companyId }).catch((err) => {
      toast.error(err.message);
      console.log(err);
      throw new Error(err.message);
    });
  }, [accessKey]);

  function onSubmit() {
    const registerAndNavigate = async () => {
      try {
        if (!companyId || !accessKey) {
          toast.error(
            'The Company, that you want to join is not found. Please contact the admin.'
          );
          throw new Error('Company Id Not Found.');
        }

        // logout user if user already logged in
        if (auth.currentUser) await auth.signOut();

        // validate Access Key
        await validateAccessKey({ accessKey, companyId });

        // register user
        const registerData: RegisterServiceProps = {
          ...values,
          role: AppUserRoles.PERSONAL,
          companyId,
        };
        await personalRegisterWithEmailPass(registerData);

        // deactive access key after using
        deactiveAccessKey(accessKey, companyId);

        // if everything okey then navigate user
        navigate('/login');
        toast.success('Registration successful. You can now log in.');
      } catch (error: any) {
        // Tüm hataları burada ele al
        console.error('Error during registration:', error);
        toast.error(`An error occurred: ${error.message}`);
      } finally {
        // Loading state'leri sıfırla
        dispatch(setIsAppLoading(false));
        dispatch(setIsLoading(false));
        setSubmitting(false);
      }
    };

    registerAndNavigate();
  }

  return (
    <FormPagesesContainer>
      <PersonalRegisterForm
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        touched={touched}
        values={values}
      />
    </FormPagesesContainer>
  );
}

export default PersonalRegister;
