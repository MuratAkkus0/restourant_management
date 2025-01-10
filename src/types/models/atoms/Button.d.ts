import { MouseEventHandler } from 'react';

export interface ButtonProps {
  text: string;
  type: 'button' | 'submit' | 'reset';
  isSubmitInProgress?: boolean;
  onBtnClick?: MouseEventHandler<HTMLButtonElement>;
}
