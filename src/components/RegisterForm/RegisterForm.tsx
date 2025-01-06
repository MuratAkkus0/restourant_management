import { useFormik } from 'formik';
import { RegisterFormSchema } from '../../schemas/RegisterFormSchema';
import Logo from '../Logo';
import { FontSizes, LogoSizes } from '../../types/models/LogoModels';
import { useState } from 'react';
import { GrFormView, GrFormViewHide } from 'react-icons/gr';
import AddressAutocomplete from '../AddressAutocomplete';
import FormInputUnderlined from '../FormComponents/FormInputUnderlined';
import SideBySideInputContainer from '../FormComponents/SideBySideInputContainer';
import FormTitle from '../FormComponents/FormTitle';
import { FormInputUnderlinedProps } from '@/types/models/ComponentPromptModels';
import StepByStepFormContainer from '../FormComponents/StepByStepFormContainer';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Loading from '../Loading';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useRegisterWithEmailPass } from '@/customHooks/useRegisterWithEmailPass';

const RegisterForm = () => {
  const [countryVal, setCountryVal] = useState('');

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
      businessName: '',
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
    setSubmitting,
  } = formik;
  const navigate = useNavigate();
  const registerWithEmailPass = useRegisterWithEmailPass();
  function onSubmit(data: any) {
    // submitted
    try {
      data.country = countryVal;
      console.log(data);
      registerWithEmailPass({ ...values, country: countryVal });
      navigate('/login');
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

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

  const step1 = (
    <>
      <SideBySideInputContainer
        isByMdScreensInputsGrid={true}
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
    </>
  );

  const step2 = (
    <AddressAutocomplete setCountryVal={setCountryVal} formik={formik} />
  );
  const isLoading = useSelector(
    (store: RootState) => store.appConfigSlice.isLoading
  );
  return (
    <>
      {isLoading ? <Loading /> : ''}
      <StepByStepFormContainer
        formLogo={
          <Logo
            FontSize={FontSizes.semiRegular}
            LogoSize={LogoSizes.semiRegular}
          />
        }
        formTitle={<FormTitle titleText="Register" />}
        isSubmitting={isSubmitting}
        submitButtonText="Register"
        handleSubmit={handleSubmit}
        formAllStepComponents={[step1, step2]}
      />
    </>
  );
};

export default RegisterForm;
