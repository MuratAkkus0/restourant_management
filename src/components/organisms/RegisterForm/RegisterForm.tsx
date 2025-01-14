import { FormikValues, useFormik } from 'formik';
import { RegisterFormSchema } from '../../../schemas/RegisterFormSchema';
import Logo from '../../molecules/Logo';
import { useState } from 'react';
import { GrFormView, GrFormViewHide } from 'react-icons/gr';
import AddressAutocomplete from '../../molecules/AddressAutocomplete';
import UnderlinedInput from '../../atoms/UnderlinedInput';
import SideBySideInputContainer from '../../templates/SideBySideInputContainer';
import FormTitle from '../../atoms/FormTitle';
import StepByStepFormContainer from '../../templates/StepByStepFormContainer';
import { toast } from 'sonner';
import { useAdminRegisterWithEmailPass } from '@/customHooks/useAdminRegisterWithEmailPass';
import { UnderlinedInputProps } from '@/types/models/atoms/UnderlinedInputModels';
import { FontSizes, LogoSizes } from '@/types/enums/LogoEnums';
import { RegisterServiceProps } from '@/types/models/services/RegisterNewPersonalModels';
import { AppUserRoles } from '@/types/enums/AuthEnums';

const RegisterForm = () => {
  const [countryVal, setCountryVal] = useState('');
  const registerWithEmailPass = useAdminRegisterWithEmailPass();

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
    validationSchema: RegisterFormSchema,
    onSubmit: onSubmit,
  });

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    isSubmitting,
    setSubmitting,
  } = formik;

  async function onSubmit(data: FormikValues) {
    try {
      data.name = `${(data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase()).trim()}`;
      data.surname = `${(data.surname.charAt(0).toUpperCase() + data.surname.slice(1).toLowerCase()).trim()}`;
      data.companyName = `${(data.companyName.charAt(0).toUpperCase() + data.companyName.slice(1)).trim()}`;
      data.country = countryVal;

      const registerData: RegisterServiceProps = {
        name: data.name,
        surname: data.surname,
        email: data.email,
        pass: data.pass,
        role: AppUserRoles.admin,
        street: data.street,
        houseNo: data.houseNo,
        state: data.state,
        postalCode: data.postalCode,
        city: data.city,
        country: countryVal,
        companyName: data.companyName,
      };
      await registerWithEmailPass(registerData);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  const formFields: UnderlinedInputProps[] = [
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
          <UnderlinedInput
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
          <UnderlinedInput
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
          <UnderlinedInput
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
          <UnderlinedInput
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

  return (
    <>
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
        formAllStepComponents={[step1, step2]}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </>
  );
};

export default RegisterForm;
