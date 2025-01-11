import { MouseEventHandler } from 'react';

export enum AccessCardSizeProps {
  normal = 'normal',
  regular = 'regular',
  semiRegular = 'semiRegular',
  big = 'big',
}

export interface AccessKeyCardProps {
  inputVal: string;
  setInputVal?: CallableFunction;
  placeholder?: string;
  isInputReadOnly?: boolean;
  btnOnClick: MouseEventHandler<HTMLButtonElement>;
  descText: string;
  cardTitle: string;
  btnText: string;
  cardLogoSize?: AccessCardSizeProps;
  cardFontSize?: AccessCardSizeProps;
}
