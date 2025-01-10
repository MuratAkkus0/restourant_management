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
