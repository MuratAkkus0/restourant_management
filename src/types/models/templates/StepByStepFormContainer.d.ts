export interface StepByStepFormContainerProps {
  formLogo: React.ReactNode;
  formTitle: React.ReactNode;
  formAllStepComponents: React.ReactNode[];
  isSubmitting: boolean;
  prevButtonText?: string;
  nextButtonText?: string;
  submitButtonText?: string;
  formik: FormikProps<any>;
}
