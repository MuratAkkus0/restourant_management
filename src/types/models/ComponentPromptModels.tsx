import { FormikErrors, FormikTouched } from 'formik';
import {
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
} from 'react';
import { IconType } from 'react-icons';

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
  slotType?: SideBySideInputContainerSlotWidths;
}
