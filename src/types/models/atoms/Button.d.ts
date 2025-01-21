import { MouseEventHandler } from 'react';

export interface ButtonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  isSubmitInProgress?: boolean;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  onBtnClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
