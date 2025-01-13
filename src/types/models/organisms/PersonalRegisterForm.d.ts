import { FormikErrors, FormikState, FormikTouched, FormikValues } from 'formik';

export interface PersonalRegisterFormProps {
  values: FormikValues;
  handleBlur: CallableFunction;
  handleChange: CallableFunction;
  errors: FormikErrors;
  touched: FormikTouched;
  isSubmitting: FormikState;
  handleSubmit: CallableFunction;
}
