import PersonalRegisterForm from '@/components/organisms/PersonalRegisterForm';
import FormPagesesContainer from '@/components/templates/FormPagesesContainer';
import { PersonalRegisterFormSchema } from '@/schemas/PersonalRegisterFormSchema';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function PersonalRegister() {
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get('cId');
  const accessKey = searchParams.get('key');

  useEffect(() => {
    console.log(accessKey);
    console.log(companyId);
  }, []);

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
      companyName: '',
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

  function onSubmit() {
    //Sd
    console.log('Submit Func Active...');
    setTimeout(() => {
      setSubmitting(false);
    }, 500);
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
