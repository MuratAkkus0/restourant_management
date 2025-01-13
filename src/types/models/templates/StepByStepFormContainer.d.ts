import { FormikProps } from 'formik';

export interface StepByStepFormContainerProps {
  formLogo: React.ReactNode;
  formTitle: React.ReactNode;
  formAllStepComponents: React.ReactNode[];
  isSubmitting: boolean;
  prevButtonText?: string;
  nextButtonText?: string;
  submitButtonText?: string;
  // formik: FormikProps<any>;
  handleSubmit: CallableFunction<any>;
  errors: FormikErrors<any>;
}
