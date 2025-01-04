import { FormikErrors, FormikTouched } from 'formik';
import { ChangeEventHandler, FocusEventHandler } from 'react';
import { IconType } from 'react-icons';

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
      setShowIcon?: CallableFunction;
      Icon: IconType;
      SecondIcon?: IconType;
    })
  | (FormInputUnderlinedBaseProps & {
      hasIcon?: false;
      showIcon?: never;
      setShowIcon?: never;
      Icon?: never;
      SecondIcon?: never;
    });

// SideBySideInputContainer Components Models
export enum SideBySideInputContainerSlotWidths {
  'smallLeftSlot' = 4,
  'equalSlots' = 6,
  'smallRightSlot' = 8,
}
export interface SideBySideInputContainerProps {
  right: React.ReactNode;
  left: React.ReactNode;
  slotType?: SideBySideInputContainerSlotWidths;
}
