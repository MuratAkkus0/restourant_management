import { FormikErrors, FormikProps, FormikTouched } from 'formik';
import {
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
} from 'react';
import { IconType } from 'react-icons';

// Header Components Props
export interface MenuListProps {
  isMenuOpen: boolean;
}
export interface MenuItemProps {
  menuName: string;
  redirectTo: string;
}
// FormTitle Components Props
export interface FormTitleProps {
  titleText: string;
}

// FunctionalFormButton Component Props
export enum ButtonDirections {
  'backward',
  'forward',
}
export interface FunctionalFormButtonBaseProps {
  buttonText: string;
  isSubmitInProgress: boolean;
  formCurrentStep: number;
  formLastStep: number;
  onButtonClick: MouseEventHandler<HTMLButtonElement>;
}
export interface FunctionalFormButtonDirectableProps
  extends FunctionalFormButtonBaseProps {
  isDirectable: true;
  buttonDirection: ButtonDirections;
}
export interface FunctionalFormButtonNotDirectableProps
  extends FunctionalFormButtonBaseProps {
  isDirectable?: false;
  buttonDirection?: never;
}

export type FunctionalFormButtonProps =
  | FunctionalFormButtonDirectableProps
  | FunctionalFormButtonNotDirectableProps;

// FormInputUnderlined Components Models
export type FormInputUnderlinedBaseProps = {
  labelText: string;
  inputId: string;
  inputValue?: string;
  onInputChange?: ChangeEventHandler<HTMLInputElement>;
  onInputBlur?: FocusEventHandler<HTMLInputElement>;
  inputType?: string;
  inputPlaceHolder?: string;
  errors?: FormikErrors<{ [key: string]: string }>;
  touched?: FormikTouched<{ [key: string]: boolean }>;
};

export type FormInputUnderlinedProps =
  | (FormInputUnderlinedBaseProps & {
      hasIcon: true;
      showIcon?: boolean;
      onClickIcon?: MouseEventHandler<SVGAElement>;
      Icon: IconType;
      SecondIcon?: IconType;
    })
  | (FormInputUnderlinedBaseProps & {
      hasIcon?: false;
      showIcon?: never;
      onClickIcon?: never;
      Icon?: never;
      SecondIcon?: never;
    });

// SideBySideInputContainer Components Models
export enum SideBySideInputContainerSlotWidths {
  'smallLeftSlot' = '4',
  'equalSlots' = '7',
  'smallRightSlot' = '9',
}
export interface SideBySideInputContainerProps {
  right: React.ReactNode;
  left: React.ReactNode;
  isByMdScreensInputsGrid?: boolean;
  slotType?: SideBySideInputContainerSlotWidths;
}

// AddressAutocomplate Component Props
export interface AddressAutocompleteProps {
  setCountryVal: CallableFunction;
  formik: FormikProps<any>;
}

// SearchableDropdown Component Props
export interface SearchableDropdownProps {
  countryList: { name: string; code: string }[];
  onCountrySelect: (country: string) => void;
}

// UserCircleCardWithName Component Props
export interface UserCircleCardWithNameProps {
  fullName: string;
  imgUrl?: string;
  greetingText?: string;
}

// StepByStepFormContainer Component Props
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

//LoginWithEmailPass Component Props
export interface LoginWithEmailPassProps {
  (email: string, pass: string): void;
}

export interface registerData {
  name: string;
  surname: string;
  email: string;
  pass: string;
  passConfirm: string;
  street: string;
  houseNo: string;
  state: string;
  postalCode: string;
  city: string;
  country: string;
  companyName: string;
}

// RegisterWithEmailPass Component Props
export interface RegisterWithEmailPassProps {
  (data: registerData): void;
}
