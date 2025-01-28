export type UnderlinedInputBaseProps = {
  labelText: string;
  inputId: string;
  inputValue?: string;
  onInputChange?: ChangeEventHandler<HTMLInputElement>;
  onInputBlur?: FocusEventHandler<HTMLInputElement>;
  inputType?: 'text' | 'password' | 'number';
  inputPlaceHolder?: string;
  errors?: FormikErrors<{ [key: string]: string }>;
  touched?: FormikTouched<{ [key: string]: boolean }>;
  isMultiline?: boolean;
  className?: string;
};

export type UnderlinedInputProps =
  | (UnderlinedInputBaseProps & {
      hasIcon: true;
      showIcon?: boolean;
      onClickIcon?: MouseEventHandler<SVGAElement>;
      Icon: IconType;
      SecondIcon?: IconType;
      iconPosition?: 'left' | 'right';
    })
  | (UnderlinedInputBaseProps & {
      hasIcon?: false;
      showIcon?: never;
      onClickIcon?: never;
      Icon?: never;
      SecondIcon?: never;
      iconPosition?: never;
    });
