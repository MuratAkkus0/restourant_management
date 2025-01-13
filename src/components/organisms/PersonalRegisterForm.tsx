import FormTitle from '@/components/atoms/FormTitle';
import UnderlinedInput from '@/components/atoms/UnderlinedInput';
import Logo from '@/components/molecules/Logo';
import SideBySideInputContainer from '@/components/templates/SideBySideInputContainer';
import StepByStepFormContainer from '@/components/templates/StepByStepFormContainer';
import { FontSizes, LogoSizes } from '@/types/enums/LogoEnums';
import { UnderlinedInputProps } from '@/types/models/atoms/UnderlinedInputModels';
import { PersonalRegisterFormProps } from '@/types/models/organisms/PersonalRegisterForm';
import { GrFormView, GrFormViewHide } from 'react-icons/gr';

const PersonalRegisterForm: React.FC<PersonalRegisterFormProps> = ({
  values,
  handleBlur,
  handleChange,
  errors,
  touched,
  isSubmitting,
  handleSubmit,
}) => {
  const personalRegisterFormFields: UnderlinedInputProps[] = [
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
      {personalRegisterFormFields.map((item, index) => {
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

  return (
    <>
      <StepByStepFormContainer
        formLogo={
          <Logo
            FontSize={FontSizes.semiRegular}
            LogoSize={LogoSizes.semiRegular}
          />
        }
        formTitle={<FormTitle titleText="Personal Register" />}
        isSubmitting={isSubmitting}
        submitButtonText="Register"
        formAllStepComponents={[step1]}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </>
  );
};

export default PersonalRegisterForm;
