import { MouseEventHandler } from 'react';

export interface ButtonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  isSubmitInProgress?: boolean;
  size?: '2xs' | 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  onBtnClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
