import PersonalRegisterForm from '@/components/organisms/PersonalRegisterForm';
import FormPagesesContainer from '@/components/templates/FormPagesesContainer';
import { usePersonalRegisterWithEmailPass } from '@/customHooks/usePersonalRegisterWithEmailPass';
import { deactiveAccessKey } from '@/features/authentication/deactiveRegisterAccessKey';
import { validateAccessKey } from '@/features/authentication/validateRegisterAccessKey';
import { PersonalRegisterFormSchema } from '@/schemas/PersonalRegisterFormSchema';
import { setIsAppLoading } from '@/store/slices/appConfigSlice';
import { setIsLoading } from '@/store/slices/onAuthChangeState';
import { AppUserRoles } from '@/types/enums/AuthEnums';
import { RegisterServiceProps } from '@/types/models/services/CreateNewPersonal';
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
  }, []);

  function onSubmit() {
    dispatch(setIsAppLoading(true));
    dispatch(setIsLoading(true));
    setSubmitting(true);
    try {
      if (!companyId || !accessKey) {
        toast.error(
          'The Company, that you want to join is not found. Please contact with admin.'
        );
        throw new Error('Company Id Not Found.');
      }
      validateAccessKey({ accessKey, companyId })
        .then(() => {
          // If access key is valid register user
          const registerData: RegisterServiceProps = {
            ...values,
            role: AppUserRoles.personal,
            companyId: companyId,
          };
          personalRegisterWithEmailPass(registerData);
          return;
        })
        .then(() => {
          deactiveAccessKey(accessKey, companyId);
          return;
        })
        .then(() => navigate('/personal'))
        .catch((err) => {
          toast.error(err.message);
          console.log(err);
          throw new Error(err.message);
        });
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      dispatch(setIsAppLoading(false));
      dispatch(setIsLoading(false));
      setSubmitting(false);
    }
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
