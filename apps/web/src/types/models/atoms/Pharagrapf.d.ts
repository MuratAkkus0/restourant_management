import { MouseEventHandler } from 'react';

export interface PharagrapfProps {
  children: React.ReactNode;
  size?: '2xs' | 'xs' | 'sm' | 'base' | 'xl';
  color?: string;
  className?: string;
  colorClassName?: string;
  onClick?: MouseEventHandler<HTMLParagraphElement>;
}
